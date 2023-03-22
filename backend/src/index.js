require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const { MongoClient } = require('mongodb');

app.use(cors());
app.use(express.json());


const client = new MongoClient(uri);

app.get("/:query", async (req, res) => {
  let query = req.params.query;
  let item = await client.db("dev-nsu-website")
    .collection("Data")
    .find({ Pages: query })

  return res.json(item)


})

client.connect(err => {
  if (err) { console.error(err); return false; }
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
});




