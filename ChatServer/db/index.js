import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on('connected', () => {
            console.log("✔ Mongoose connected to DB");
        });
        console.log("✔ Successfully connected to MongoDB");
        
    }
    catch (error) {
        console.log("❌ Error connecting to MongoDB:", error);
    }
}