const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zbytkar', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB připojeno: ${conn.connection.host}`);
  } catch (error) {
    console.error('Chyba připojení k databázi:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
