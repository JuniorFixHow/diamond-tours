import Blog from "../models/BlogsModel.js";

export const addBlog = async(req, res)=>{
    try {
        const newBlog = new Blog(req.boady);
        const savedblog = await newBlog.save();
        res.status(200).json(savedblog);
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog =async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id,
            {$set:req.body}, {new:true}
        );
        res.status(200).json(blog);
    } catch (error) {
        console.log(error)
    }
}


export const getBlogs = async(req, res)=>{
    try {
        const blogs = await Blog.find({});
        res.status(201).json(blogs);
    } catch (error) {
        console.log(error)
    }
}


export const getBlog =async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = Blog.findById(id);
        res.status(201).json(blog);
    } catch (error) {
        console.log(error)
    }
}


export const deleteBlog =async(req, res)=>{
    try {
        const {id} = req.params;
        const blog = Blog.findByIdAndDelete(id);
        res.status(200).json('Blog deleted successfully');
    } catch (error) {
        console.log(error)
    }
}