const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
});
const RefreshToken = mongoose.model('refreshToken', refreshTokenSchema) || mongoose.model['refreshToken'];
module.exports = RefreshToken;
