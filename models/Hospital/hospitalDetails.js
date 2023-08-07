const mongoose = require('mongoose');

const hospitalDetailsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  hospitalID: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  noOfBeds: { type: Number },
  activePatients: { type: Number },
  activeDays: [{ day: String, openingTime: String, closingTime: String }],
  noOfStaffs: { type: Number },
  images: [{ type: String }],
});

const HospitalDetailsModel = mongoose.model('HospitalDetails', hospitalDetailsSchema);

module.exports = HospitalDetailsModel;
