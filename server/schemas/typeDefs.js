const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    authors: [String]
    description: String
    bookId: String!
    image: String
    link: String
    title: String!
  }

  input savedBook {
    authors: [String]
    title: String
    description: String
    bookId: String
    image: String
    link: String 
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;