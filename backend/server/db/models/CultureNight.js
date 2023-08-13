const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");

const cultureNightSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  Summary: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  Time_start: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Featured: {
    type: [String],
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Japanese_title: {
    type: String,
    required: true
  },
  English_definition: {
    type: String,
    required: true,
  },
  English_romaji: {
    type: String,
    required: true
  },
  Gallery: {
    type: [String],
    required: true
  },
  more_info_pdf: {
    type: String,
    required: true
  }
});
const CultureNight = mongoose.model('culture-night', cultureNightSchema) || mongoose.model['culture-night'];

module.exports = CultureNight;
