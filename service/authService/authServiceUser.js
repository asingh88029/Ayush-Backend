const OtpService = require('./OtpService'); // Replace with the correct path to your OtpService

class AuthServiceUser {
  constructor() {
    this.otpService = new OtpService(process.env.FAST2SMSAPI);
  }

  async sendOtp() {
    try {
      const otp = await this.otpService.generateOtp();
      // Implement sending OTP logic (e.g., store request ID or OTP)
      return otp;
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  async confirmOtp(requestId, enteredOtp) {
    try {
      const verificationResult = await this.otpService.confirmOtp(requestId, enteredOtp);
      // Implement handling verification result (e.g., return true or false)
      return verificationResult;
    } catch (error) {
      throw new Error('Failed to verify OTP');
    }
  }
}

module.exports = new AuthServiceUser();