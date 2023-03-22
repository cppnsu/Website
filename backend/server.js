// IMPORTS
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require("dotenv").config({ path: ".env" });

// DECLARING CONSTANTS
const PORT = process.env.PORT || 3000
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);

/* ROUTES */
app.get("/:query", async (req, res) => {
  let myQuery = await client.db("dev-nsu-website")
    .collection("Data")
    .find({ Pages: myQuery })
    .toArray();

  return res.json(item)
})


// CONNECTION STRING
client.connect(err => {
  if (err) { console.error(err); return false; }
  // connection to mongo is successful, listen for requests
  app.listen(PORT, () => {
    console.log("listening for requests");
  })
});



