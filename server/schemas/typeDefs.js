const { gql } = require('apollo-server-express');

const typeDefs = gql`
//  User model
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
// virtual in User model
    bookCount: Int
  }

//  Book model
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
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

//   based on queries in user-controllers
  type Query {
// query to always find and return user logged in data by JWT
    me: User
  }

//  based on mutations in user-controllers
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;