const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
    {
        reviewId:  { type: mongoose.Schema.Types.ObjectId, ref: 'review' },
        songId: {type:String},
        submittedOn: {type:Date},
        submitedBy: {type:String},
        reviewDesc: {type:String},
        rating:{type:Number},
        visibility: {type:Boolean}
       
    }
);

const Review = mongoose.model('review',reviewSchema);
module.exports = Review;