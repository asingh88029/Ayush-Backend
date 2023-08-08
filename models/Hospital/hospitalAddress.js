const mongoose = require('mongoose');

const hospitalAddressSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hospitalID: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pinCode: { type: String, required: true },
  country: { type: String, required: true },
});

const HospitalAddressModel = mongoose.model('hospitalAddresses', hospitalAddressSchema);

module.exports = HospitalAddressModel;