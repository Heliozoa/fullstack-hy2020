
import React, { useState, useEffect } from 'react'
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
    const result = useQuery(AUTHORS)
    const authors = result.loading ? [] : result.data.allAuthors
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{ query: AUTHORS }]
    })

    useEffect(() => {
      if (authors[0]) {
        setName(authors[0].name)
      }
    }, [authors])

    const submit = (e) => {
      e.preventDefault()

      editAuthor({
        variables: {
          name,
          born: Number(born)
        }
      })
      setName('')
      setBorn('')
    }

    return <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>
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
