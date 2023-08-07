const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: { type: String, },
  mobileNumber: { type: String, required: true },
  emails: { type: [String],  },
  activeOtp: { type: String,  },
  activeOtpId: { type: String,  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
