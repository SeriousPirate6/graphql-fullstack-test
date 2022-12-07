const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./schema/resolvers");
const { typeDefs } = require("./schema/type-defs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // the context is optional
  // it is used to pass variables between resolvers
  // in this we are passing the request
  context: ({ req }) => {
    return { req };
  },
});

server.listen().then(({ url }) => {
  console.log(`API is running: ${url}`);
});
