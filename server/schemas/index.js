const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
  type Book {
    bookId: ID!
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]
  }

  type Query {
    me: User
    searchBooks(query: String!): [Book]
  }

  type Mutation {
    saveBook(bookId: ID!, authors: [String], title: String, description: String, image: String, link: String): User
    removeBook(bookId: ID!): User
    addUser(username: String!, email: String!): User
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = { typeDefs, resolvers };
