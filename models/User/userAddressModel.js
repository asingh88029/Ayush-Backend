const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userProfileID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
});

const UserAddressModel = mongoose.model('UserAddress', userAddressSchema);

module.exports = UserAddressModel;
