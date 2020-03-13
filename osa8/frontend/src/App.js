
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  useSubscription, useApolloClient, gql
} from '@apollo/client'
import { BOOK_ADDED, BOOKS, AUTHOR_ADDED, AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const client = useApolloClient()

  const includedIn = (set, object) =>
    set.map(p => p.id).includes(object.id)

  const updateBookCache = (book) => {
    book.genres.concat(null).forEach(genre => {
      try {
        const existingData = client.readQuery({ query: BOOKS, variables: { genre } })
        if (!includedIn(existingData.allBooks, book)) {
          client.writeQuery({
            query: BOOKS,
            variables: { genre },
            data: { allBooks: existingData.allBooks.concat(book) }
          })
          window.alert(`book ${book.title} added`)
          console.log('book added')
        }
      } catch (err) {
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      console.log('new book', book)
      updateBookCache(book)
    }
  })

  const updateAuthorCache = (author) => {
    try {
      const existingData = client.readQuery({ query: AUTHORS })
      if (!includedIn(existingData.allAuthors, author)) {
        const newAuthor = {
          ...author,
          bookCount: 1
        }
        client.writeQuery({
          query: AUTHORS,
          data: { allAuthors: existingData.allAuthors.concat(newAuthor) }
        })
        window.alert(`author ${author.name} added`)
        console.log('author added')
      }
    } catch (err) {
      console.warn('readquery', err)
    }
  }

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const author = subscriptionData.data.authorAdded
      console.log('new author', author)
      updateAuthorCache(author)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App