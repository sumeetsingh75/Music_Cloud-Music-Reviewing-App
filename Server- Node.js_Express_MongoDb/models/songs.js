const mongoose = require("mongoose");
const songSchema = mongoose.Schema(
    {
       
        songId: { type: mongoose.Schema.Types.ObjectId, ref: 'song' },
        songTitle: {type:String},
        artist: {type:String},
        album:{type:String},
        year: {type:Number},
        comment: {type:String},
        genre:{type:String},
        submittedOn: {type:Date},
        submittedBy: {type:String},
        numberOfRatings: {type:Number},
        averageRating:{type:Number},
        visibility:{type:Boolean}

       
    }
);

const Song = mongoose.model('song',songSchema);
module.exports = Song;