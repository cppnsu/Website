const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/:page").get(async function(req, res) {
  let db_connect = await dbo.getDb("dev-nsu-website");
  const results = await db_connect
    .collection("Data")
    .find({ Name: req.params.page })
    .toArray();

  res.json(results[0])


});


module.exports = recordRoutes;
