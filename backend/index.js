require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { json } = require("body-parser")
const typeDefs = require("./server/graphql/typeDefs")
const resolvers = require("./server/graphql/resolvers")
const cors = require("cors");


async function startApolloServer() {
  const app = express();

  app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      allowedHeaders: "X-CSRF-Token,X-Requested-With,Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,X-Api-Version",
      preflightContinue: true,
      maxAge: 999999999
    })
  );
  app.use(express.json());

  const port = process.env.PORT || 3000;
  const dbo = require("./server/db/conn");

  dbo.connectToServer(function(err) {
    if (err) console.error(err);
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { dbo }
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  app.get('/', (req, res) => {
    res.send("IT WORKS!!!")
  });

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
  })
}

startApolloServer();

