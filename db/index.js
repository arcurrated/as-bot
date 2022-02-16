const dbConfig = {
	url: process.env.MONGODB_URL || 'mongodb://localhost:27017/as_tg_db'
}
const mongoose = require('mongoose')
//const mongoosePaginate = require('mongoose-paginate-v2')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.clients = require('./client.model.js')(mongoose)
db.orders = require('./order.model.js')(mongoose)

module.exports = db