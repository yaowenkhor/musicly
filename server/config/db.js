import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error:, ${error}`);
    process.exit(1);
  }
};
 