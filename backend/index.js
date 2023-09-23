require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { json } = require("body-parser")
const typeDefs = require("./server/graphql/typeDefs")
const resolvers = require("./server/graphql/resolvers")
const cors = require("cors");
const jwt = require("jsonwebtoken")

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
    // Here, every route in resolvers gets access to the database object, as well as the JWT token role
    context: ({req}) => {
      const token = req.headers.authorization || ''
      console.log("TOKEN", token)
      try {
        const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
          if(err) {
            throw new Error("Token invalid")
          }
          else {
            return userInfo
          }
        })
        return {dbo, userInfo}
      } catch (err) {
        return {dbo}
      }
    }
  });
  await server.start();

  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: ({req}) => {
        const token = req.headers.authorization || ''
        try {
          const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userInfo) => {
            if(err) {
              throw new Error("Token invalid")
            }
            else {
              return userInfo
            }
          })
          return {dbo, userInfo}
        } catch (err) {
          return {dbo}
        }
}}),
  );

  app.get('/', (req, res) => {
    res.send("IT WORKS!!!")
  });

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
  })
}

startApolloServer();

