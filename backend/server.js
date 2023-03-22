require("dotenv").config({ path: ".env" });
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

app.get("/:query", async (req, res) => {
  let item = await client.db("dev-nsu-website")
    .collection("Data")
    .find({ Pages: req.params["query"] })
    .toArray()

  return res.json(item)
})

client.connect(err => {
  if (err) { console.error(err); return false; }
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
    console.log(`listening for requests on port ${PORT}`);
  })
});



