import { gql } from "@apollo/client"

const GET_AUTHOR = gql`{
    authors {
      name,
      age
      id
    }
  }`

const GET_BOOKS = gql`{
    books {
      name,
      genre,
      id
    }
  }
  `

const GET_BOOK = gql`
  query GetBook($bookId : ID!) {
    book(id: $bookId) {
    name,
    genre,
    author {
      name,
      age,
      books {
        id,
        name,
        genre
      }
    }
  }
}
`

const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name,genre : $genre, authorId: $authorId) {
            id
        }
    }
`

export {
    GET_AUTHOR,
    GET_BOOKS,
    ADD_BOOK,
    GET_BOOK
}
