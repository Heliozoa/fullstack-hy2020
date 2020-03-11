const uuid = require('uuid/v1')
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')

const mongodb_uri = process.env.MONGODB_URI
mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongodb')
    }).catch((err) => {
        console.error('error connecting to mongodb:', err)
    })


const typeDefs = gql`
  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
  }

  type Mutation {
      reset: Boolean
      addBook(
          title: String!
          published: Int!
          author: String!
          genres: [String!]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int
      ): Author
  }
`

const resolvers = {
    Query: {
        bookCount: () => {
            console.log('bookCount')
            Book.collection.countDocuments()
        },
        authorCount: () => {
            console.log('authorCount')
            Author.collection.countDocuments()
        },
        allBooks: async (root, args) => {
            console.log('allBooks', args)
            const { author, genre } = args
            let books = await Book.find({}).populate('author')
            if (author) {
                books = books.filter(b => b.author.name === author)
            }
            if (genre) {
                books = books.filter(b => b.genres.includes(genre))
            }
            return books
        },
        allAuthors: async () => {
            console.log('allAuthors')
            const authors = await Author.find({})
            const books = await Book.find({}).populate('author')
            return authors.map(a => {
                const bookCount = books.filter(b => b.author.name === a.name).length
                const newA = {
                    ...a.toObject(),
                    bookCount
                }
                return newA
            })
        },
    },
    Mutation: {
        reset: async () => {
            console.log('reset')
            await Book.deleteMany({})
            await Author.deleteMany({})
        },
        addBook: async (root, args) => {
            console.log('addBook', args)
            const name = args.author
            let author = await Author.findOne({ name })
            if (author === null) {
                author = new Author({
                    name,
                    born: null
                })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                }
            }

            const book = new Book({ ...args, author })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
            return book
        },
        editAuthor: async (root, args) => {
            console.log('editAuthor', args)
            const { name, setBornTo } = args
            return await Author.findOneAndUpdate({ name }, { born: setBornTo }, { new: true })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
