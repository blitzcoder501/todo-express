const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET /products — получить все или отфильтрованные по категории и/или поиску
router.get('/', async (req, res) => {
	try {
		const { category, search } = req.query
		const filter = {}

		// фильтр по категории
		if (category) {
			filter.category = category
		}

		// фильтр по поиску в названии (регистронезависимый)
		if (search) {
			filter.title = { $regex: search, $options: 'i' }
		}

		const products = await Product.find(filter).sort({ publishedAt: -1 })
		res.json(products)
	} catch (err) {
		res.status(500).json({ error: 'Ошибка сервера' })
	}
})

// GET /products/:id — получить товар по ID
router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		if (!product) {
			return res.status(404).json({ error: 'Товар не найден' })
		}
		res.json(product)
	} catch (err) {
		res.status(500).json({ error: 'Ошибка сервера' })
	}
})

// POST /products — создать товар
router.post('/', async (req, res) => {
	try {
		const { title, description, category, price, quantity, image } = req.body
		const product = new Product({
			title,
			description,
			category,
			price,
			quantity,
			image,
		})
		await product.save()
		res.status(201).json(product)
	} catch (err) {
		res.status(400).json({ error: 'Невалидные данные' })
	}
})

// PUT /products/:id — обновить товар
router.put('/:id', async (req, res) => {
	try {
		const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		if (!updated) return res.status(404).json({ error: 'Товар не найден' })
		res.json(updated)
	} catch (err) {
		res.status(400).json({ error: 'Ошибка обновления' })
	}
})

// DELETE /products/:id — удалить товар
router.delete('/:id', async (req, res) => {
	try {
		const deleted = await Product.findByIdAndDelete(req.params.id)
		if (!deleted) return res.status(404).json({ error: 'Товар не найден' })
		res.json({ message: 'Товар удалён' })
	} catch (err) {
		res.status(500).json({ error: 'Ошибка сервера' })
	}
})

module.exports = router
