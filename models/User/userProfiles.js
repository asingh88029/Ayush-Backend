const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profileType: { type: String, required: true, enum: ['main', 'relation'] },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
});

const UserProfileModel = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfileModel;
