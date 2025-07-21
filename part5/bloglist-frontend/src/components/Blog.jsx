import { useState } from "react"

const Blog = ({ blog, handleUpdate, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isVisible, setIsVisible] = useState(false)
  const showWhenVisible = { display: (isVisible ? "" : "none") }
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{isVisible ? "hide" : "view"}</button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => handleUpdate({ ...blog, likes: blog.likes + 1 })}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username === user.username &&
          <div>
            <button onClick={() => handleDelete(blog)}>remove</button>
          </div>
        }
      </div>
    </div >
  )
}

export default Blog
