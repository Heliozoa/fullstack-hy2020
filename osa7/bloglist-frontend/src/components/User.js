import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
    const id = useParams().id
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getUsers().then(users => {
            const user = users.find(u => u.id === id)
            setUser(user)
        })
    }, [])

    if (user === null) {
        return <div></div>
    } else if (user === undefined) {
        return <div>no such user found</div>
    }

    console.log(user.blogs)
    return <>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
            {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </ul>
    </>
}

export default User
