import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
    if (isConnected) {
        console.log("Database is already connected");
        return;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = connection.connections[0].readyState === 1;
        if (isConnected) {
            console.log("Database connected successfully");
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed");
    }
};

export default dbConnect;