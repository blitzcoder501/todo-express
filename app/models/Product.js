const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	title: { type: String, required: true }, // название
	description: { type: String, required: true }, // описание
	category: { type: String, required: true }, // категория (телефон, планшет и т.д.)
	price: { type: Number, required: true }, // цена
	quantity: { type: Number, default: 0 }, // количество
	image: { type: String }, // ссылка на картинку
	publishedAt: { type: Date, default: Date.now }, // дата публикации
})

module.exports = mongoose.model('Product', productSchema)
