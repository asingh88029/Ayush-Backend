const mongoose = require('mongoose');

const hospitalStaffsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  hospitalID: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  role: { type: String, enum: ['Admin', 'Doctor','Staff'] },
  mobileNumber: String,
  _id: mongoose.Schema.Types.ObjectId,
});

hospitalStaffsSchema.index({ _id: 1, hospitalID: 1 }, { unique: true });

const HospitalStaffsModel = mongoose.model('HospitalStaffs', hospitalStaffsSchema);

module.exports = HospitalStaffsModel;
