module.exports = (mongoose) => {
	const ClientSchema = mongoose.Schema({
		tgId: Number,
		name: String,
		phoneNumber: String,
	})

	ClientSchema.method('toJSON', function(){
		const {__v, _id, ...object} = this.toObject();
		object.id = _id;
		return object;
	})

	ClientSchema.set('timestamps', true)

	return ClientSchema
}