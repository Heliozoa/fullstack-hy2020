import React, { useState } from 'react'

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

export default Login
