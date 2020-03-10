import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ login, setUsername, setPassword }) => {
  return <div>
    <h2>log in to application</h2>
    <form onSubmit={event => { event.preventDefault(); login() }}>
      <div>username <input onChange={event => setUsername(event.target.value)} /></div>
      <div>password <input onChange={event => setPassword(event.target.value)} /></div>
      <div><button type="submit">log in</button></div>
    </form>
  </div >

}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Login
