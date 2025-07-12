import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginService.login({ username, password })
      setUser(userReturned)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userReturned))

    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            Username: <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            Password: <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
  const blogsDetails = () => (
    <>
      <h2>blogs</h2>
      <h4>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></h4>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )


  return (
    <div>
      {user ? blogsDetails() : loginForm()}
    </div>
  )
}

export default App
