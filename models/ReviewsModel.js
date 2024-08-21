import { model, models, Schema } from "mongoose"

const ReviewSchema = new Schema({
    user:{
        name:String,
        id:String,
        photo:String
    },
    isReply:{
        type:Boolean,
        default:false,
    },
    originalReview:String,
    content:String
},{timestamps:true})

const Review = models.Review || model('Review', ReviewSchema);
export default Review;
// 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'