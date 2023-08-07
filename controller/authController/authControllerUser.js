class AuthControllerUser {
  sendOtp(req, res) {
    // Implement logic to send OTP for user authentication
    res.send('OTP sent for user authentication');
  }

  verifyOtp(req, res) {
    // Implement logic to verify OTP for user authentication
    res.send('OTP verified for user authentication');
  }
}

module.exports = AuthControllerUser;