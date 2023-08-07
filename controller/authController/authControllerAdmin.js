class AuthControllerAdmin {
  sendOtp(req, res) {
    // Implement logic to send OTP for admin authentication
    res.send('OTP sent for admin authentication');
  }

  verifyOtp(req, res) {
    // Implement logic to verify OTP for admin authentication
    res.send('OTP verified for admin authentication');
  }
}

module.exports = AuthControllerAdmin;
