const { configServiceSetChain, phrases } = require('../config/constants.config.js')
const { Markup, Scenes } = require('telegraf')
const db = require('../db')
const fs = require('fs')

const adminId = Number(process.env.ADMIN_TG_ID)

const orderRequest = async (ctx) => {
	ctx.reply(phrases.orderRequestSuccess, Markup.removeKeyboard())

	let order = {
		client: ctx.client,
		operations: ctx.session.serviceSet,
	}
	await ctx.scene.leave()
	let _order = db.orders(order)
	await _order.save()

	// MESSAGE TO ADMIN
	let text = 'Новая заявка на работы:\n\n'
	for(let i = 0; i < _order.operations.length; i++){
		text += (i+1) + '. ' + _order.operations[i].title + '\n'
	}
	text += '\n'
	text += 'Клиент: ' + _order.client.name + '\n'
	text += 'Телефон: ' + _order.client.phoneNumber + '\n'

	ctx.telegram.sendMessage(adminId, text, Markup.inlineKeyboard([
		Markup.button.callback('Да', 'order_'+_order.id+'_sold'),
		Markup.button.callback('Нет', 'order_'+_order.id+'_not_sold')
	]))
}

const nextConfigServiceChainStep = async (ctx) => {
	ctx.session.currentConfigServiceSetStepIndex += 1
	await ctx.scene.leave()
	if(ctx.session.currentConfigServiceSetStepIndex >= configServiceSetChain.length){
		let tgId = null // колхоз начало
		if(ctx.message){
			tgId = ctx.message.from.id
		} else {
			tgId = ctx.update.callback_query.from.id
		}
		db.clients.findOne({ tgId }).then(async client => {
			if(client && client.phoneNumber){
				ctx.client = client
				orderRequest(ctx)
			} else {
				await ctx.scene.enter('receivePhoneNumber')
			}
		}) // колхоз конец
 	} else {
		await ctx.scene.enter('processConfigServiceChainStep')
	}
}

module.exports = {
	processConfigServiceChainStep: () => {
		const scene = new Scenes.BaseScene('processConfigServiceChainStep')
		let currStepIndex = null
		scene.enter(async (ctx) => {
			currStepIndex = ctx.session.currentConfigServiceSetStepIndex
			let desc = configServiceSetChain[currStepIndex].desc
			let kb = Markup.keyboard([[phrases.yesLabel, phrases.noLabel]]).resize()
			if(configServiceSetChain[currStepIndex].img){
				ctx.replyWithPhoto({ source: fs.createReadStream(configServiceSetChain[currStepIndex].img)}, {
				caption: desc, ...kb})
			} else {
				ctx.reply(desc, kb)
			}
		})
		scene.hears(phrases.yesLabel, (ctx) => {
			let currStepOperation = configServiceSetChain[currStepIndex]
			ctx.session.serviceSet.push(currStepOperation)
			nextConfigServiceChainStep(ctx)
		})
		scene.hears(phrases.noLabel, (ctx) => {
			nextConfigServiceChainStep(ctx)
		})
		scene.command('cancel', (ctx) => {
			ctx.scene.leave()
			ctx.reply('Отмена', Markup.removeKeyboard())
		})
		scene.on('message', (ctx) => {
			ctx.reply(phrases.invalidAnswer, Markup.keyboard([[phrases.yesLabel, phrases.noLabel]]).resize())
		})

		return scene
	},
	receivePhoneNumber: () => {
		const scene = new Scenes.BaseScene('receivePhoneNumber')
		scene.enter(async (ctx) => {
			let tgId = null
			if(ctx.message){
				tgId = ctx.message.from.id
			} else {
				tgId = ctx.update.callback_query.from.id
			}
			db.clients.findOne({ tgId }).then(async client => {
				
				if(client && client.phoneNumber){
					orderRequest(ctx)
				} else {
					ctx.reply(phrases.contactRequest, Markup.keyboard([Markup.button.contactRequest('Отправить'),]).oneTime().resize())
				}
			})
		})
		scene.on('contact', async (ctx) => {
			let contact = ctx.message.contact
			let tgId = ctx.message.from.id
			if(contact.user_id == tgId){
				const client = db.clients({
					tgId,
					name: ctx.message.from.first_name,
					phoneNumber: contact.phone_number,
				})
				if(contact.last_name){
					client.name += ' ' + contact.last_name
				}
				await client.save()
				ctx.client = client
				orderRequest(ctx)
			} else {
				ctx.reply(phrases.wrongPhoneNumber)
			}
		})
		scene.command('cancel', (ctx) => {
			ctx.scene.leave()
			ctx.reply('Отмена', Markup.removeKeyboard())
		})
		scene.on('message', (ctx) => {
			ctx.reply(phrases.invalidContactAnswer, Markup.keyboard([Markup.button.contactRequest('Отправить'),]).oneTime().resize())	
		})
		return scene
	}
}