const mongoose = require('mongoose');

const userDocumentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userProfileID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  documentType: { type: String, required: true, enum: ['Type1', 'Type2', 'Type3'] },
  documentBlob: { type: Buffer, required: true },
});

const UserDocumentModel = mongoose.model('UserDocument', userDocumentSchema);

module.exports = UserDocumentModel;
