const express = require('express');
const bodyParser = require('body-parser');
const MongoConnect = require('./database/mongoConnect'); // Replace with the correct path
const AuthRoutes = require('./routes/Auth/authRoutes');
const HospitalRoutes = require('./routes/Hospital/hospitalRoutes');
const ProfileRoutes = require('./routes/Profile/profileRoute');
const DocumentRoutes = require('./routes/Profile/documentRoutes');
const SelfRoutes = require('./routes/Auth/selfRoutes')

const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Middleware
    this.setupMiddlewares();

    // Initialize MongoDB connection
    this.dbConnector = new MongoConnect(process.env.NODE_ENV === 'production' ? process.env.MONGOURI_PROD : process.env.MONGOURI_DEV);

    // Import route classes
    // Setup routes
    this.setupRoutes();


    // Handle unhandled promise rejections globally
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      this.shutdown();
    });

    // Handle application errors
    this.app.use((err, req, res, next) => {
      console.error('Application Error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
  }

  setupRoutes() {
    // Initialize route instances
    const authRoutes = new AuthRoutes();
    const hospitalRoutes = new HospitalRoutes();
    const profileRoutes = new ProfileRoutes();
    const documentRoutes = new DocumentRoutes();
    const selfRoutes = new SelfRoutes()

    // Use route instances with base paths
    this.app.use('/api/v1', authRoutes.getRouter());
    this.app.use('/api/v1', selfRoutes.getRouter());
    this.app.use('/api/v1', hospitalRoutes.getRouter());
    this.app.use('/api/v1', profileRoutes.getRouter());
    this.app.use('/api/v1', documentRoutes.getRouter());
  }



  async start() {
    try {
      // Connect to MongoDB
      await this.dbConnector.connect();
      console.log('Connected to MongoDB');

      // Start the server
      this.serverInstance = this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      this.shutdown();
    }
  }

  setupMiddlewares() {
    // Enable CORS for cross-origin requests
    this.app.use(cors());

    // Add security headers with Helmet
    this.app.use(helmet());

    // Prevent XSS attacks by sanitizing user input
    this.app.use((req, res, next) => {
      for (const key in req.body) {
        req.body[key] = xss(req.body[key]);
      }
      next();
    });

    // Parse incoming request bodies in JSON format
    this.app.use(bodyParser.json());
  }


  shutdown() {
    if (this.serverInstance) {
      this.serverInstance.close(() => {
        console.log('Server closed');
      });
    }

    if (this.dbConnector) {
      this.dbConnector.disconnect(() => {
        console.log('MongoDB disconnected');
      });
    }
  }
}

module.exports = Server;
