import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
        <Table striped>
            <tbody>
                <tr>
                    <th>name</th>
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
        </Table>
    </>
}

export default UserList