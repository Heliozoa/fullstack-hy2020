import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserList from './components/UserList'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationTimer, setNotificationTimer] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch({
        type: 'INIT_BLOGS',
        data: { blogs }
      })
    })
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
      dispatch({
        type: 'ADD_BLOG',
        data: { blog: response.data }
      })
      notify('blog created!')
    }).catch(err => {
      console.error('ERR', err)
      notify(err.response.data.error)
    })
  }

  const Notification = () => {
    if (notification === null) {
      return <></>
    } else {
      return <div><hr />{notification}<hr /></div>
    }
  }

  const notify = (message) => {
    dispatch({
      type: 'NOTIFICATION',
      data: { message },
    })
    clearTimeout(notificationTimer)
    const timerId = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION',
      })
    }, 4000)
    setNotificationTimer(timerId)
  }

  if (user === null) {
    return <>
      <Notification />
      <Login login={login} setUsername={setUsername} setPassword={setPassword} />
    </>
  } else {
    return <Router>
      <h2>blogs</h2>
      <Notification />
      <div>{user.username} logged in <button onClick={logout}>logout</button></div>
      <br />
      <Switch>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <BlogForm blogs={blogs} user={user} createBlog={createBlog} />
          <BlogList user={user} blogs={blogs} />
        </Route>
      </Switch>
    </Router>
  }
}

export default App
