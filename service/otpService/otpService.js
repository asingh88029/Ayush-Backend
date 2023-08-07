var unirest = require("unirest");

class OtpService {
  constructor(apiKey) {
    this.apiKey = "GIK5HbRdJleWswpt26hxkjX4FB8ZDcYEiLVaum1oU9gPzyvfrQ6StV2JOZCRzuUYyqh0N7KTcFrWfigv"; // Your Fast2SMS API key
    this.apiUrl = 'https://www.fast2sms.com/dev/bulkV2'; // Fast2SMS API URL
  }

  generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp

  }

  sendOtp(phoneNumber, otp) {
    return new Promise((resolve, reject) => {
      const req = unirest("POST", this.apiUrl);

      req.headers({
        "authorization": this.apiKey
      });

      req.form({
        "variables_values": otp,
        "route": "otp",
        "numbers": phoneNumber,
      });

      req.end(function (res) {
        if (res.error) {
          reject(new Error(res.error));
        } else {
          resolve(res.body);
        }
      });
    });
  }

}

module.exports = OtpService;

