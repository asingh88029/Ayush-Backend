const express = require('express');

class DocumentRoutes {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    const DocumentController = require('../../controller/profileController/documentController'); // Adjust the path

    const documentController = new DocumentController();

    // Add Document
    this.router.post('/profile/:profileID/document', documentController.addDocument);

    // Remove Document
    this.router.delete('/profile/:profileID/document/:documentID', documentController.removeDocument);

    // Remove All Documents
    this.router.delete('/profile/:profileID/document/', documentController.removeAllDocuments);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = DocumentRoutes;
