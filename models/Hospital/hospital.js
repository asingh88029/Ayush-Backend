const mongoose = require('mongoose');


const hospitalSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  hospitalType: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  specialities: [{ type: String }],
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

// Index the location field for geospatial queries
hospitalSchema.index({ location: '2dsphere' });


const HospitalModel = mongoose.model('hospitals', hospitalSchema);

module.exports = HospitalModel;
