const express = require('express');

class ProfileRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const ProfileController = require('../../controller/profileController/profileController'); // Adjust the path

    const profileController = new ProfileController();

    // Add Profile
    this.router.post('/profile', profileController.addProfile);

    // Update Profile (address, details)
    this.router.patch('/profile/:profileID', profileController.updateProfile);

    // Remove Profile
    this.router.delete('/profile/:profileID', profileController.removeProfile);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = ProfileRoutes;
