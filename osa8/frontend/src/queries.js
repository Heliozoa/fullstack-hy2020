import { gql } from '@apollo/client'

export const BOOK = gql`
  fragment Book on Book {
    title
    published
    author {
      name
      born
    }
    genres
    id
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...Book
    }
  }
  ${BOOK}
`

export const BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(genre: $genre, author: $author) {
      ...Book
    }
  }
  ${BOOK}
`

export const AUTHOR = gql`
  fragment Author on Author {
      name
      born
      id
  }
`

export const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      ...Author
    }
  }
  ${AUTHOR}
`

export const AUTHORS = gql`
  query {
    allAuthors {
      ...Author
      bookCount
    }
  }
  ${AUTHOR}
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      ...Book
    }
  }
  ${BOOK}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!,
    $born: Int!
    ) {
      editAuthor(
        name: $name,
        setBornTo: $born
      )
      {
        name
        born
      }
    }
`