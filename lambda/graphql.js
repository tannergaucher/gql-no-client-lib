const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
`

const resolvers = {
  Query: {},
  Mutation: {},
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
