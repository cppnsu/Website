const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const boardMemberSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Position: {
    type: String,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Major: {
    type: String,
    required: true
  },
  Headshot_Link: {
    type: String,
    required: true
  }
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  Description: {
    type: String,
    required: true
  },
  Signup_Link: {
    type: String,
    required: true
  },
  Splash_photo_link: {
    type: String,
    required: true
  },
  Splash_photo_ID: {
    type: String,
    required: true
  },
  Board_Members: {
    type: [boardMemberSchema],
    required: true
  },
  Gallery: {
    type: [String],
    required: true
  }
});

const About = mongoose.model('about', aboutSchema);

module.exports = About;
