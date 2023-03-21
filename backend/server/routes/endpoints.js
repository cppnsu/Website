const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const data = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

data.route("/").get(function(req, res)) {
  res.send("This is a test");
}
// This section will help you get a list of all the records.
data.route("/:query").get(function(req, res) {
  let db_connect = dbo.getDb("dev-nsu-website");
  db_connect
    .collection("Data")
    .find({ Pages: `${req.params["query"]}` })
    .toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = data;
