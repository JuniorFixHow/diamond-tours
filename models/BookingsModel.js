import mongoose from "mongoose";

const BookingsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullname:{
        type:{last:String, first:String}
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:{country:String, region:String, city:String}
    },
    service:{
        type:String,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
},{timestamps:true});

const Bookings = mongoose.models.Bookings || mongoose.model('Bookings', BookingsSchema);
export default Bookings;