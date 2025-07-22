import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URI;
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
