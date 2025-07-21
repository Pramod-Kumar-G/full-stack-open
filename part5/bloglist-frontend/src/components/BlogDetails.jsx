import Blog from "./Blog"
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { useRef } from 'react'

const BlogDetails = ({ handleLogout, setNotification, user }) => {
  const [blogs, setBlogs] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs)
    }
    )
  }, [])

  const handleUpdate = async (blog) => {
    try {
      const blogData = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const updatedBlog = await blogService.updateBlog(blog.id, blogData)
      const updatedBlogs = blogs.map(b =>
        b.id === updatedBlog.id ? updatedBlog : b
      )
      setBlogs(updatedBlogs)

      setNotification({
        message: `Blog '${updatedBlog.title}' was liked`,
        type: 'success'
      })
      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({
        message: 'Error updating blog',
        type: 'error'
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(updatedBlogs)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div>
      <h4>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></h4>
      <Togglable buttonLabel="create new blog" ref={ref}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} ref={ref} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} user={user} />
      )}
    </div>
  )
}

export default BlogDetails
