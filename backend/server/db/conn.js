require("dotenv").config({ override: true, debug: true, path: __dirname + "/../.env" });
const mongoose = require("mongoose")
const Db = process.env.ATLAS_URI;
var _db;

module.exports = {
  connectToServer: async function(callback) {
    try {
      await mongoose.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    }
    catch (err) {
      if (err) console.error(err)
    }
  },

  getDb: function() {
    return _db;
  },
};
