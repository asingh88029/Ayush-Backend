const express = require('express');

class HospitalRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const HospitalController = require('../../controller/hospitalController/hospitalController'); // Adjust the path

    const hospitalController = new HospitalController();

    // Get Nearby Hospitals (hospital, hospitalAddress, hospital details)
    this.router.get('/hospital/nearby', hospitalController.getNearbyHospitals);

    // Get All Hospitals (hospital, hospitalAddress, hospital details)
    this.router.get('/hospitals', hospitalController.getAllHospitals);

    // Get One Hospital (hospital, address, details, staff)
    this.router.get('/hospital/:hospitalID', hospitalController.getHospitalByID);

    // Get Hospital
    this.router.get('/hospital/', hospitalController.getFilteredHospitals);

    // Get One Hospital Staffs
    this.router.get('/hospital/:hospitalID/staff', hospitalController.getHospitalStaff);

    // Get One Hospital Address
    this.router.get('/hospital/:hospitalID/address', hospitalController.getHospitalAddress);

    // Get One Hospital Details
    this.router.get('/hospital/:hospitalID/details', hospitalController.getHospitalDetails);

    // Add Hospitals
    this.router.post('/hospital', hospitalController.createHospital);

    // Add Hospital Address
    this.router.post('/hospital/:hospitalID/address', hospitalController.createHospitalAddress);

    // Add Hospital Details
    this.router.post('/hospital/:hospitalID/details', hospitalController.createHospitalDetails);

    // Add Staffs
    this.router.post('/hospital/:hospitalID/staffs', hospitalController.createHospitalStaffs);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = HospitalRoutes;
