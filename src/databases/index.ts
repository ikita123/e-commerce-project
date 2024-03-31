import mongoose from 'mongoose';

const DB_URL = 'mongodb+srv://nikitasharma:nikita-sharma@cluster1.poqels0.mongodb.net/e-coomerce?retryWrites=true&w=majority';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URL);  
  } catch (error) {
    console.error('Database connection failed:');
    process.exit(1);
  }
};

export default connectDB;
