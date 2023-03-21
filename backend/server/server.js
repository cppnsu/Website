require("dotenv").config({ path: "../.env" });
console.log(__dirname + ".env")
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/endpoints"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, '0.0.0.0' , () => {
  // perform a database connection when server starts
  dbo.connectToServer(function(err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

