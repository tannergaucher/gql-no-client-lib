const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    hello: String!
  }

  type Mutation {
    signup: User!
  }
`

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello'
    },
  },
  Mutation: {
    signup: () => {
      return
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async request => {
    return {
      request,
    }
  },
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
