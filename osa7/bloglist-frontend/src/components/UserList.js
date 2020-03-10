import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getUsers().then(users => {
            console.log(users)
            setUsers(users)
        })
    }, [])

    return <>
        <h2>Users</h2>
        <table>
            <tbody>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
                {users.map(u =>
                    <tr key={u.id}>
                        <td>
                            <Link to={`users/${u.id}`}>{u.name}</Link>
                        </td>
                        <td>
                            {u.blogs.length}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}

export default UserList