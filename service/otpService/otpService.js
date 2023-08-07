const axios = require('axios');

class OtpService {
  constructor(apiKey) {
    this.apiKey = apiKey; // Your Fast2SMS API key
    this.apiUrl = 'https://www.fast2sms.com/dev'; // Fast2SMS API URL
  }

  async generateOtp() {
    try {
      const response = await axios.post(
        `${this.apiUrl}/generateRandomOtp`,
        {},
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );

      if (response.data && response.data.request_id) {
        return response.data.request_id; // Return the request ID for later verification
      } else {
        throw new Error('Failed to generate OTP');
      }
    } catch (error) {
      throw new Error('Failed to generate OTP');
    }
  }

  async sendOtp(phoneNumber, otp) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/sendOTP`,
        {
          message: `Your OTP is ${otp}`,
          language: 'english',
          route: 'qt',
          numbers: phoneNumber,
        },
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );

      if (response.data && response.data.return) {
        return true;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      throw new Error('Failed to send OTP');
    }
  }

  async confirmOtp(requestId, enteredOtp) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/verifyOTP`,
        {
          otp: enteredOtp,
          request_id: requestId,
        },
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );

      if (response.data && response.data.return) {
        return response.data.return;
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (error) {
      throw new Error('Failed to verify OTP');
    }
  }


}

module.exports = OtpService;
