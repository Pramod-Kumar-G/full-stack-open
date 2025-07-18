import { forwardRef, useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = forwardRef((props, ref) => {
  const { blogs, setBlogs, setNotification } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    ref.current.toggleVisibility()
    const savedBlog = await blogService.createBlog({ title, author, url })
    setBlogs([...blogs, savedBlog])
    setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' })
    setTimeout(() => setNotification(''), 3000)
  }
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addBlog}>
        <div>
          <div>title: <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div>author: <input type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /></div>
          <div>url: <input type='text' name='url' value={url} onChange={(e) => setUrl(e.target.value)} /></div>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
})

export default BlogForm
