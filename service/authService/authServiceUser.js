const jwt = require('jsonwebtoken');

const OtpService = require('../otpService/otpService'); // Replace with the correct path to your OtpService
const UserService = require("./userService")

class AuthServiceUser {
  constructor() {
    this.otpService = new OtpService(process.env.FAST2SMSAPI);
    this.userService = new UserService()
  }

  async generateOtp() {
    try {
      const otp = this.otpService.generateOtp();
      return otp;
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  async sendOtp(mobileNumber, otp) {
    try {
      // Send OTP using the OTP service (replace with your actual sending logic)
      let res = await this.otpService.sendOtp(mobileNumber, otp);

      return res.request_id; // Return the provided OTP
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }
  async confirmOtp(requestId, enteredOtp) {
    try {
      let user = await this.userService.findUserByActiveOtpIdAndOtp(requestId, enteredOtp)
      if (!user) {
        return false
      }

      const token = await this.createBearerToken(user);



      return token;
    } catch (error) {
      throw new Error('Failed to verify OTP');
    }
  }

  createBearerToken = async (user) => {
    // Create a JWT token with user data
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: "user"
      },
      process.env.JWT_SECRET_KEY, // Use your JWT secret key
      { expiresIn: '12h' } // Token expiration time
    );

    user.activeOtp = null; // Clear activeOtp
    user.activeOtpId = null; // Clear activeOtpId
    await user.save(); // Save the updated user object

    console.log(user);


    return token;
  }

}

module.exports = AuthServiceUser