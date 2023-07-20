const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const eventSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 }, // id is just gonna be a generated uuid
  Name: { type: String, required: true },
  Date_Start: { type: Date, required: true },
  Date_End: { type: Date },
  Time_Start: { type: String, required: true },
  Time_End: String,
  Location: { type: String, required: true },
  More_Info: { type: String, required: true },
  Photo_url: { type: String, required: true },
  Member_Price: { type: Number, required: true },
  Non_Member_Price: { type: Number, required: true },
  Sign_up_form: { type: String, required: true }
});
const Event = mongoose.model('upcoming-events', eventSchema);

module.exports = Event;
