module.exports = (mongoose) => {
	const ClientSchema = require('./schemas/client.schema.js')(mongoose)

	const OrderSchema = mongoose.Schema({
		client: ClientSchema,
		operations: [{
			code: String,
			desc: String,
			title: String,
		}],
		sold: {
			type: Boolean,
			default: false
		}
	})

	const OrderModel = mongoose.model('order', OrderSchema)
	return OrderModel
}