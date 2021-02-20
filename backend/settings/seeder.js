const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { connectDB } = require(".");
const { users, products } = require(".");
const { User, Product, Order } = require(".");

dotenv.config();
connectDB();

const importData = async() => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);
        
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((item) => {
            return { ...item, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log("data imported!");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log("data destroyed");
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

if(process.argv === "-d") {
    destroyData();
} else {
    importData();
};