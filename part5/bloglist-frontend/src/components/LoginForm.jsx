import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userReturned = await loginService.login({ username, password })
      setUser(userReturned)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userReturned))
      blogService.setToken(userReturned.token)

    } catch (exception) {
      console.log('Wrong credentials')
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default LoginForm
