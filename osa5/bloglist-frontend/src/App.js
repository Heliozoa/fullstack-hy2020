import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

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
      <h2>blogs</h2>
      <div>{user.username} logged in <button onClick={logout}>logout</button></div>
      <br />
      <BlogForm blogs={blogs} setBlogs={setBlogs} user={user} />
      <BlogList blogs={blogs} />
    </>
  }
}

export default App
