import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogDetails from './components/BlogDetails'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <h2>{user ? "Blogs" : "Log in to application"}</h2>
      {notification && <Notification notification={notification} />}
      {user ? <BlogDetails handleLogout={handleLogout} setNotification={setNotification} user={user} /> : <LoginForm setUser={setUser} setNotification={setNotification} />}
    </div>
  )
}

export default App
