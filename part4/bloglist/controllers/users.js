const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersRouter = require('express').Router()


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password should be given' })
  }
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username and password should be atleast 3 characters long' })
  }
  if (!password) {
    return response.status(400).json({ error: 'password missing' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find()
  response.json(users)
})

module.exports = usersRouter
