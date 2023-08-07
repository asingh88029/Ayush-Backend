const mongoose = require('mongoose');

class MongoConnect {
  constructor(databaseURL) {
    this.databaseURL = databaseURL;
  }

  async connect() {
    try {
      await mongoose.connect(this.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error.message);
    }
  }
}

module.exports = MongoConnect;
