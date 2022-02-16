const { Markup } = require('telegraf')
const { phrases } = require('../config/constants.config.js')

module.exports = async (ctx) => {
	await ctx.answerCbQuery()

	let kb = Markup.inlineKeyboard([
		[Markup.button.callback(phrases.confirmSubcribeToDiagn, 'subcribe_to_diagn_confirm')],
		[Markup.button.callback(phrases.backLabel, 'menu')]
	])
	ctx.editMessageText(phrases.subcribeToDiagnDescription, kb)
}