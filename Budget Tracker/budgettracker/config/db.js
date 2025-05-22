const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/budget-tracker', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
  
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;