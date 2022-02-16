require('dotenv').config({ path: '.env.local' })
const { Telegraf, Markup, Scenes, session } = require('telegraf')
const { diagnServiceSet, serviceSets, phrases } = require('./config/constants.config.js')
const { processConfigServiceChainStep, receivePhoneNumber } = require('./scenes')
const { replyStart, replySelectServiceSet, replyConfigServiceSet, replySubcribeToDiagn, replyMenu } = require('./replies')
const db = require('./db')


db.mongoose.connect(db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('mongo connected')
}).catch(()=> {
	console.log('error in mongo connection')
	process.exit()
})


const token = process.env.TOKEN
const flushDb = Number(process.env.FLUSH_DB)
const adminId = Number(process.env.ADMIN_TG_ID)

if(flushDb){
	db.orders.deleteMany({}).then(data => {
		console.log(data)
	})
	db.clients.deleteMany({}).then(data => {
		console.log(data)
	})
}

const bot = new Telegraf(token)

//bot.use(Telegraf.log())
bot.use(session())
const stage = new Scenes.Stage([ processConfigServiceChainStep(), receivePhoneNumber() ])
bot.use(stage.middleware())

bot.use((ctx, next) => {
	let tgId = null
	if(!ctx.message && !ctx.update.callback_query){
		console.log("=======")
		console.log(ctx.message)
		console.log("=======")
		next()
		return
	}
	if(ctx.message){
		tgId = ctx.message.from.id
	} else {
		tgId = ctx.update.callback_query.from.id
	}
	
	db.clients.findOne({ tgId }).then(data => {
		if(data){
			ctx.client = data
			next()
		}
	})
})

bot.command('start', replyStart)
bot.action('start', replyStart)

bot.command('menu', replyMenu)
bot.action('menu', replyMenu)

bot.action('select_service_set', replySelectServiceSet)
bot.action('config_service_set', replyConfigServiceSet)
bot.action(/subcribe_to_diagn$/, replySubcribeToDiagn)

bot.action('start_config_service_set', async (ctx) => {
	await ctx.answerCbQuery()

	ctx.session.currentConfigServiceSetStepIndex = 0
	ctx.session.serviceSet = []
	ctx.scene.enter('processConfigServiceChainStep')
})

bot.action(/subcribe_to_diagn_confirm$/, async (ctx) => {
	await ctx.answerCbQuery()

	ctx.session.serviceSet = diagnServiceSet
	ctx.scene.enter('receivePhoneNumber')
})

bot.action(/select_set_([0-9]+)$/, async (ctx) => {
	await ctx.answerCbQuery()
	let setId = Number(ctx.match[1])
	let set = serviceSets[setId]

	ctx.session.serviceSet = set
	text = phrases.singleServiceSetDescription
	for(let i = 0; i < set.length; i++){
		let op = set[i]
		text += phrases.singleOperationPrefix + String(op.title) + phrases.singleOperationPostfix
	}
	let kb = Markup.inlineKeyboard([
		[Markup.button.callback(phrases.confirmSingleServiceSet, 'confirm_set_' + setId +'_confirm')],
		[Markup.button.callback(phrases.backLabel, 'select_service_set')]
	])
	ctx.editMessageText(text, kb)
})

bot.action(/confirm_set_([0-9]+)/, async (ctx) => {
	await ctx.answerCbQuery()

	ctx.scene.enter('receivePhoneNumber')
})

bot.action(/order_([a-zA-Z0-9]+)_sold/, async (ctx) => {
	ctx.answerCbQuery()
	let orderId = ctx.match[1]
	db.orders.findById(orderId, (order) => {
		if(order){
			order.sold = true
			order.save()
		}
	})
	let text = ctx.update.callback_query.message.text
	text += '\n\n✅ Продано'
	ctx.editMessageText(text)
})

bot.action(/order_([a-zA-Z0-9]+)_not_sold/, async (ctx) => {
	ctx.answerCbQuery()
	let orderId = ctx.match[1]
	db.orders.findById(orderId, (order) => {
		if(order){
			order.sold = false
			order.save()
		}
	})
	let text = ctx.update.callback_query.message.text
	text += '\n\n❌ Не продано'
	ctx.editMessageText(text)
})

bot.command('cancel', (ctx) => {
	ctx.reply('Отмена', Markup.removeKeyboard())
})

bot.on('message', (ctx) => {
	console.log(ctx.message.text)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))