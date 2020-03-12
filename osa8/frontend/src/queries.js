import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(genre: $genre, author: $author) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
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
      title
      author {
        name
      }
      published
      genres
    }
  }
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