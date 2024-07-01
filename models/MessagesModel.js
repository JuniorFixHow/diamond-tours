import mongoose from "mongoose";

const MessagesSchema = mongoose.Schema({
    emails:[String],
    email:String,
    subject:String,
    message:String,
    name:String,
    isSingle:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

const Messages = mongoose.models.Message || mongoose.model('Message', MessagesSchema);
export default Messages;