const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

// GET /todos — получить все
router.get('/', async (req, res) => {
	const todos = await Todo.find()
	res.json(todos)
})

// POST /todos — создать
router.post('/', async (req, res) => {
	const { title } = req.body
	const newTodo = await Todo.create({ title })
	res.status(201).json(newTodo)
})

// PUT /todos/:id — обновить
router.put('/:id', async (req, res) => {
	const { id } = req.params
	const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true })
	res.json(updated)
})

// DELETE /todos/:id — удалить
router.delete('/:id', async (req, res) => {
	const { id } = req.params
	await Todo.findByIdAndDelete(id)
	res.status(204).end()
})

module.exports = router
