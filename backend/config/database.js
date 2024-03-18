const mongoose = require('mongoose');
const connectDatabase = (uri) => {
  if (!uri) {
      console.error("MongoDB URI is missing. Please ensure it's set in your environment variables.");
      process.exit(1);
  }

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log('MongoDB connection error:', err));
};  
module.exports = connectDatabase;
