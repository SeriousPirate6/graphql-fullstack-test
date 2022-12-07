const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
    favouriteMovies: [Movie!]
  }

  type Movie {
    id: ID!
    name: String!
    year: Int!
    isInCinema: Boolean!
  }

  type Query {
    # changed user type to UsersResult for union error handling
    users: UsersResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = CANADA
  }

  input UpdateUsername {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsername!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    CANADA
    UNITED_STATES
    UKRAINE
    ITALY
    AUSTRIA
  }

  type UsersSuccessfulResult {
    users: [User!]!
  }

  type UsersErrorResult {
    message: String!
  }

  # this is a union between the two results. It will be returned only one not null
  union UsersResult = UsersSuccessfulResult | UsersErrorResult
`;

module.exports = { typeDefs };
