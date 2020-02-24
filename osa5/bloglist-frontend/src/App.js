import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
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
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      setUser(user)
    }
  }, [])

  const login = () => {
    loginService.login(username, password).then(user => {
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    })
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)

  }

  if (user === null) {
    return <Login login={login} setUsername={setUsername} setPassword={setPassword} />
  } else {
    return <>
      <button onClick={logout}>logout</button>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  }
}

export default App
