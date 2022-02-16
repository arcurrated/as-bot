module.exports = (mongoose) => {
	const ClientSchema = require('./schemas/client.schema.js')(mongoose)

	ClientSchema.set('timestamps', true)
	//ClientSchema.plugin(mongoosePaginate)
	const ClientModel = mongoose.model('client', ClientSchema)
	return ClientModel
}