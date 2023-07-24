const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

async function connectDatabase() {
  try {
    await mongoose.connect(`mongodb://${DB_URL}/mydatabase`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Failed to disconnect from MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectDatabase, 
  disconnectDatabase
};
