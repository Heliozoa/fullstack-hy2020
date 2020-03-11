import React from 'react'
import { gql, useQuery } from '@apollo/client'

const BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

const Books = (props) => {
  const result = useQuery(BOOKS)

  if (!props.show) {
    return null
  }

  const books = result.loading ? [] : result.data.allBooks

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books