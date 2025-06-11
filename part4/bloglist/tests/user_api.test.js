const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const { mongoose } = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { usersInDB } = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'pramod',
      name: 'Pramod Kumar',
      password: 'rimba',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'rimba',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('creation fails with proper statuscode and message if username is not provided', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      name: 'simba',
      password: 'sekret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert(result.body.error.includes('username and password should be given'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test.only('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'si',
      name: 'simba',
      password: 'sekret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert(result.body.error.includes('username and password should be atleast 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('creation fails with proper statuscode and message if password is not provided', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'simbaa',
      name: 'simba',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert(result.body.error.includes('username and password should be given'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test.only('creation fails with proper statuscode and message if password is less than 3 characters', async () => {
    const usersAtStart = await usersInDB()

    const newUser = {
      username: 'simba',
      name: 'simba',
      password: 'se',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDB()
    assert(result.body.error.includes('username and password should be atleast 3 characters long'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
