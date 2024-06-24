import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './mongoose.js';
import BookingRoutes from './routes/BookingRoutes.js';
import ContactRoutes from './routes/ContactRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import NewsRoutes from './routes/NewsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

mongoose.connection.on('connected', ()=>{
    console.log('Mongo is back')
})
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongo is disconnected')
})

const PORT = process.env.PORT || 8000;

app.use('/api/bookings', BookingRoutes);
app.use('/api/contacts', ContactRoutes);
app.use('/api/messages', MessageRoutes);
app.use('/api/news', NewsRoutes);

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})