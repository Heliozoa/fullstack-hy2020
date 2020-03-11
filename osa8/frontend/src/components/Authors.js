
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  if (!props.show) {
    return null
  }


  const AuthorTable = () => {
    const result = useQuery(AUTHORS)
    const authors = result.loading ? [] : result.data.allAuthors

    return <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  }

  const AuthorEditor = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [editAuthor] = EDIT_AUTHOR

    const submit = (e) => {
      e.preventDefault()


      setName('')
      setBorn('')
    }

    return <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          born
           <input type="number" value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  }

  return (
    <>
      <AuthorTable />
      <AuthorEditor />
    </>
  )
}

export default Authors
