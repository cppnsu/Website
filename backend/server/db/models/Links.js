const mongoose = require('mongoose');

const linkObjectSchema = new mongoose.Schema({
  Placeholder: { type: String, required: true },
  Link: { type: String, required: true }
})
const linksSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  link_objects: { type: [linkObjectSchema], required: true }
})
const Links = mongoose.model('links', linksSchema);

module.exports = Links;
