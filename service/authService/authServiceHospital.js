const otpService = require('./otpService'); // Replace with the correct path

class AuthServiceHospital {
  async sendOtp() {
    const otp = await otpService.generateOtp();
    // Implement sending OTP logic
    return otp;
  }

  async confirmOtp(enteredOtp) {
    // Implement OTP confirmation logic and return result
    return true; // For example
  }
}

module.exports = new AuthServiceHospital();
