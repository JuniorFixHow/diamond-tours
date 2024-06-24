import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGO_URL = process.env.MONGO;

let isConnected = false;
export const connectDB = async()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('Mongo already connected');
        return;
    }
    try {
        await mongoose.connect(MONGO_URL);
        isConnected = true;
        console.log('Mongo connected successfully');
    } catch (error) {
        throw new Error('DB Connection Failed!');
    }
}