const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./test_helper')


const api = supertest(app)


describe('when there are initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert(titles.includes('React patterns'))
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDB()
      assert.strictEqual(blogs.length, initialBlogs.length + 1)
      const titles = blogs.map(b => b.title)
      assert(titles.includes('Canonical string reduction'))
    })

    test('without likes property defaults the value to 0', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      }
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert(response.body.likes === 0)
    })

    test('returns status code 400 if title is missing from blog', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('returns status code 400 if url is missing from blog', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await blogsInDB()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogsInDB()

      assert(blogsAtStart.length - 1 === blogsAtEnd.length)
      const blogTitles = blogsAtEnd.map(b => b.title)
      assert(!blogTitles.includes(blogToDelete.title))
    })
  })

  describe('updation of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await blogsInDB()
      const blogToUpdate = blogsAtStart[0]
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 71 })
        .expect(200)

      const blogsAtEnd = await blogsInDB()
      assert(blogsAtEnd[0].likes === 71)
    })
  })

})
after(async () => {
  await mongoose.connection.close()
})


