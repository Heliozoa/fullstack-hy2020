import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const allBooks = useQuery(BOOKS, { variables: { genre: null } })
  const result = useQuery(BOOKS, { variables: { genre } })

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (!allBooks.loading) {
      setGenres([...new Set(allBooks.data.allBooks.map(b => b.genres).flat())])
    }
  }, [allBooks])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books