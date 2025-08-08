require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const todoRoutes = require('./routes/todos')
const productRoutes = require('./routes/products')

const app = express()
app.use(cors())
app.use(express.json())

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error('MongoDB error:', err))

app.use('/todos', todoRoutes)
app.use('/products', productRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
