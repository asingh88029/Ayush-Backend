const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  coordinateX: { type: Number, required: true },
  coordinateY: { type: Number, required: true },
  hospitalType: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  specialities: [{ type: String }],
});

const HospitalModel = mongoose.model('hospitals', hospitalSchema);

module.exports = HospitalModel;
