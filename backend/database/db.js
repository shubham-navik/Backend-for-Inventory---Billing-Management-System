const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`error :${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB; 