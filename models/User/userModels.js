const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emails: { type: [String], required: true },
  activeOtp: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
