const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.MONGODB_URI || "mongodb://localhost:27017";

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            dbName: "proshop",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log("mongodb connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1); //exit with failure
    }
}

module.exports = connectDB;