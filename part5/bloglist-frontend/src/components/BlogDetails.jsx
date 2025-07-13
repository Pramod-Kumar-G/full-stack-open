import Blog from "./Blog"
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import BlogForm from "./BlogForm"

const BlogDetails = ({ handleLogout, setNotification, user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h4>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></h4>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogDetails
