const mongoose = require('mongoose');

// This function establishes the connection to the MongoDB database.
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables.
    // Mongoose handles connection pooling automatically.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log a confirmation message.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error and exit the process.
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with a non-zero status code to indicate failure.
  }
};

module.exports = connectDB;
