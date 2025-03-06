import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();//loads envrironment variable from .env to process.env

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id; // we know that the firts user is admin user in user file

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; //spread operator..add the user key with remaining keys being not removed
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported ".green.inverse); //where it is come from colours package

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed ".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

console.log(process.argv);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
