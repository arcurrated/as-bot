const { Markup } = require('telegraf')
const { phrases } = require('../config/constants.config.js')

module.exports = async (ctx) => {
	await ctx.answerCbQuery()
	let kb = Markup.inlineKeyboard([
		[Markup.button.callback(phrases.startLabel, 'start_config_service_set')],
		[Markup.button.callback(phrases.backLabel, 'menu')]
	])
	await ctx.editMessageText(phrases.configServiceSetDescription, kb)
}