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
  const [notification, setNotification] = useState(null)
  const [notificationTimer, setNotificationTimer] = useState(null)

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
      notify('welcome!')
    }).catch(err => {
      notify(err.response.data.error)
    })
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    notify('logged out')
  }

  const createBlog = (user, title, author, url) => {
    blogService.newBlog(user, title, author, url).then(response => {
      setBlogs(blogs.concat(response.data))
      notify('blog created!')
    }).catch(err => {
      console.log(err)
      notify(err.response.data.error)
    })
  }

  const Notification = () => {
    if (notification === null) {
      return <></>
    } else {
      return <div><hr/>{notification.message}<hr/></div>
    }
  }

  const notify = (message, success) => {
    setNotification({
      success,
      message
    })
    clearTimeout(notificationTimer)
    const timerId = setTimeout(() => {
      setNotification(null)
    }, 4000)
    setNotificationTimer(timerId)
  }

  if (user === null) {
    return <>
      <Notification />
      <Login login={login} setUsername={setUsername} setPassword={setPassword} />
    </>
  } else {
    return <>
      <h2>blogs</h2>
      <Notification />
      <div>{user.username} logged in <button onClick={logout}>logout</button></div>
      <br />
      <BlogForm blogs={blogs} user={user} createBlog={createBlog} />
      <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
    </>
  }
}

export default App
