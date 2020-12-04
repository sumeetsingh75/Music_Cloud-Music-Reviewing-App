const mongoose = require("mongoose");
const playlistSchema = mongoose.Schema(
    {
        listId:  { type: mongoose.Schema.Types.ObjectId, ref: 'playlist' },
        listTitle: {type:String},
        listDesc: {type:String},
        createdOn: {type:Date},
        createdBy: {type:String},
        visibility: {type:Boolean},
        songs:{type:[String]}
       
    }
);

const Playlist = mongoose.model('playlist',playlistSchema);
module.exports = Playlist;