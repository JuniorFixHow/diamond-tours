import News from "../models/NewsModel.js";


export const getAllNews = async(req, res)=>{
    try {
        const news = await News.find({});
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
export const createNews = async(req, res)=>{
    try {
        const {email} = req.body;
        const news = await News.findOne({email});
        if(news){
            await News.findOneAndDelete({email});
            res.status(201).json('You have successfully unsubscribed from Diamond Tours News');
        }
        else{
            const newNews = new News(req.body);
            const savedNews = await newNews.save();
            res.status(200).json(savedNews);
        }
    } catch (error) {
        console.log(error);
    }
}
export const getOneNews = async(req, res)=>{
    try {
        const {id} = req.params;
        const news = await News.findById(id);
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
export const deleteNews = async(req, res)=>{
    try {
        const {id} = req.params;
        const news = await News.findByIdAndDelete(id);
        res.status(200).json('News deleted successfully');
    } catch (error) {
        console.log(error);
    }
}