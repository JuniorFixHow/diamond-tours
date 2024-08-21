import Review from "../models/ReviewsModel.js";

export const createReview =async(req, res)=>{
    try {
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        console.log(error);
    }
}

export const updateReview = async(req, res)=>{
    try {
        const {id} = req.params;
        const updatedReview = await Review.findByIdAndUpdate(id, 
            {$set:req.body}, {new:true}
        );
        res.status(200).json(updatedReview);
    } catch (error) {
        console.log(error);
    }
}


export const getReviews = async(req, res)=>{
    try {
        const reviews = await Review.find({});
        res.status(201).json(reviews);
    } catch (error) {
        console.log(error);
    }
}


export const getReplies = async(req, res)=>{
    try {
        const {id} = req.params;
        const replies = await Review.find({originalReview:id});
        res.status(201).json(replies);
    } catch (error) {
        console.log(error);
    }
}

export const deleteReview = async(req, res) =>{
    try {
        const {id} = req.params;
        const review = await Review.findById(id);
        if(review.isRely){
            await Review.findByIdAndDelete(id);
        }else{
            await Review.deleteMany({originalReview:id});
            await Review.findByIdAndDelete(id);
        }
        res.status(201).json('Deleted successfully');
    } catch (error) {
        console.log(error)
    }
}