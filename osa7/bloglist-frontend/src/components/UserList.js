import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { updateBlog } from '../redux-helper'

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
                            {u.name}
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