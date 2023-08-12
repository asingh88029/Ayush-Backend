const AuthServiceUser = require('../../service/authService/authServiceUser');
const UserService = require("../../service/authService/userService")

class AuthControllerUser {
  constructor() {
    this.authServiceUser = new AuthServiceUser();
    this.userService = new UserService();
  }

  sendOtp = async (req, res) => {
    try {

      // Get user's mobile number from the request body
      const { mobileNumber } = req.body;


      if (!mobileNumber) {
        return res.status(400).send('Mobile number is required');
      }
      ;

      // Generate OTP using the auth service
      const otp = await this.authServiceUser.generateOtp();

      // Send OTP using the auth service
      let requestId = await this.authServiceUser.sendOtp(mobileNumber, otp);

      // Create a new user or retrieve existing user using the user service
      let user = await this.userService.createUserOrUpdateIfPresent(
        mobileNumber,
        otp,
        requestId,
      );
      // Implement additional logic to send OTP via SMS or other methods
      console.log(user);

      res.status(200).json({
        status: "success",
        requestId,
      })
    } catch (error) {
      // console.log(error);
      res.status(500).send('Error sending OTP');
    }
  }

  verifyOtp = async (req, res) => {
    try {
      const { requestId, enteredOtp } = req.body;

      console.log(req.body);

      const token = await this.authServiceUser.confirmOtp(requestId, enteredOtp);
      if (token) {
        res.status(200).json({ message: 'OTP verified', token: token, type: "Bearer" });
      } else {
        res.status(401).send('Invalid OTP');
      }
    } catch (error) {
      res.status(500).send('Error verifying OTP');
    }
  }
}

module.exports = AuthControllerUser;