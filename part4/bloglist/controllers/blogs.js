const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const { userExtractor } = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: user.username,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs.push(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (!blog.user.equals(user._id)) {
    return response.status(403).json({ error: 'You are not authorized to delete this blog' })
  }
  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogData = request.body
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(404).end()
  }
  const user = await User.findById(blogData.user)
  if (!user) {
    return response.status(404).end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData, { new: true }).populate("user")
  response.json(updatedBlog)
})

module.exports = blogsRouter
