import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    subject:{
        type:String,
        required:true
    },
    
    message:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    }
   
},{timestamps:true});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;