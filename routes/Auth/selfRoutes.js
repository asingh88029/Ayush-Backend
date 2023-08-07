const express = require('express');

class SelfRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const SelfController = require('../../controller/selfController/selfController'); // Adjust the path

    const selfController = new SelfController();

    this.router.get('/user/me', selfController.getMe);
    this.router.get('/user/me/profiles', selfController.getProfiles);
    this.router.get('/user/me/:profileID/address', selfController.getAddress);
    this.router.get('/user/me/:profileID/documents', selfController.getDocuments);
    this.router.get('/user/me/:profileID/documents/:documentID', selfController.getDocument);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = SelfRoutes;