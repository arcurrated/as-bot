const { Markup } = require('telegraf')
const { phrases } = require('../config/constants.config.js')

module.exports = async (ctx) => {
	await ctx.answerCbQuery()

	let kb = Markup.inlineKeyboard([
		[Markup.button.callback(phrases.baseServiceSetTitle, 'select_set_0')],
		[Markup.button.callback(phrases.optimalServiceSetTitle, 'select_set_1')],
		[Markup.button.callback(phrases.progressiveServiceSetTitle, 'select_set_2')],
		[Markup.button.callback(phrases.maximumServiceSetTitle, 'select_set_3')],
		[Markup.button.callback(phrases.backLabel, 'menu')]
	])
	ctx.editMessageText(phrases.selectServiceSetDescription, kb)
}