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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h4>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></h4>
      <Togglable buttonLabel="new blog" ref={ref}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} ref={ref} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogDetails
