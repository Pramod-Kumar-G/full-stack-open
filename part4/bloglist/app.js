const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const { errorHandler, unknownEndpoint } = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
