import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI,)
        if (connect) {
            console.log('Database connected');
        }
    } catch (error) {
        console.log('Error connecting to Database');
    }
}

export default connectDB;