import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:String,
    content:String,
    excerpt:String,
    image:String,
    featured:Boolean
},{timestamps:true})

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;