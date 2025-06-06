const mongoose = require("mongoose");
require('dotenv').config();
// const MONGO_URL = "mongodb://127.0.0.1:27017/jktHostel";
const MONGO_URL = process.env.MONGO_URL;


const connectDB = async () => {
        try {
                await mongoose.connect(MONGO_URL)
                console.log("Database connected successfully");
        } catch (error) {
                console.log("Database connection failed", error);
                process.exit(1);
        }
}

module.exports = connectDB;