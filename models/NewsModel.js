import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
   
},{timestamps:true});

const News = mongoose.models.News || mongoose.model('News', NewsSchema);
export default News;