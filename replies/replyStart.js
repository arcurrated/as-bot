const { Markup } = require('telegraf')
const { phrases } = require('../config/constants.config.js')

module.exports = async (ctx) => {
	if(ctx.update.callback_query){
		await ctx.answerCbQuery()
		ctx.deleteMessage()
	}
	let kb = Markup.inlineKeyboard([
		[Markup.button.callback(phrases.selectServiceSet, 'select_service_set')],
		[Markup.button.callback(phrases.configServiceSet, 'config_service_set')],
		[Markup.button.callback(phrases.subcribeToDiagn, 'subcribe_to_diagn')],
	])
	return ctx.reply(phrases.startText, kb)
}