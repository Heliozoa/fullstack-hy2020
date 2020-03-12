import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  let books = result.loading ? [] : result.data.allBooks
  const genres = books.map(b => b.genres).flat()
  if (genre !== null) {
    books = books.filter(b => b.genres.includes(genre))
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