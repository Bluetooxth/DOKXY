import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to database');
  } catch (error) {
    console.log('Error connecting to database');
  }
};

export default databaseConnection;