import Bookings from "../models/BookingsModel.js";

export const createBooking = async(req, res)=>{
    try {
        const newBooking = new Bookings(req.body);
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (error) {
        console.log(error);
    }
}

export const getUserBookings = async(req, res)=>{
    try {
        const {userId} = req.params;
        const bookings = await Bookings.find({userId});
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
    }
}
export const getAllBookings = async(req, res)=>{
    try {
        const bookings = await Bookings.find({});
        res.status(200).json(bookings);
    } catch (error) {
        console.log(error);
    }
}
export const getBooking = async(req, res)=>{
    try {
        const {id} = req.params;
        const booking = await Bookings.findById(id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
    }
}
export const deleteBooking = async(req, res)=>{
    try {
        const {id} = req.params;
        const booking = await Bookings.findByIdAndDelete(id);
        res.status(200).json('Booking deleted successfully');
    } catch (error) {
        console.log(error);
    }
}