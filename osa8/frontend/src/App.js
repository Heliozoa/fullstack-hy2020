
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  useSubscription, useApolloClient, gql
} from '@apollo/client'
import { BOOK_ADDED, BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const updateCacheWith = (book) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    let dataInStore = {}
    try {
      dataInStore = client.readQuery({ query: BOOKS })
      console.log(dataInStore)
    } catch (err) {
      dataInStore = { allBooks: [] }
      console.warn(err)
    }

    if (!includedIn(dataInStore.allBooks, book)) {
      client.writeQuery({
        query: BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(book) }
      })
      window.alert(`book ${book.title} added`)
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      console.log(book)
      updateCacheWith(book)
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