import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Invalid/Missing environment variable: MONGODB_URI");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000, 
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("MongoDB connected successfully");
            return mongoose;
        }).catch((error) => {
            console.error("MongoDB connection error:", error);
            throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export { connectDB };