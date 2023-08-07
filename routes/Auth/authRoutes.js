const express = require('express');

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const AuthControllerUser = require('../../controller/authController/authControllerUser');
    const AuthControllerHospital = require('../../controller/authController/authControllerHospital');
    const AuthControllerAdmin = require('../../controller/authController/authControllerAdmin');

    const authControllerUser = new AuthControllerUser();
    const authControllerHospital = new AuthControllerHospital();
    const authControllerAdmin = new AuthControllerAdmin();

    this.router.post('/user/login', authControllerUser.sendOtp);
    this.router.post('/user/confirmOtp', authControllerUser.verifyOtp);

    this.router.post('/hospital/login', authControllerHospital.sendOtp);
    this.router.post('/hospital/confirmOtp', authControllerHospital.verifyOtp);

    this.router.post('/admin/login', authControllerAdmin.sendOtp);
    this.router.post('/admin/confirmOtp', authControllerAdmin.verifyOtp);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AuthRoutes;