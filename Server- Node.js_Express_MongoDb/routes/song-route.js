const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Song = require('../models/songs');
const mongoose = require("mongoose");
const Joi = require('joi');




/*Route to add new Song */
router.put('/auth/addsong', passport.authenticate('jwt', { session: false }), (req, res) => {

    const joiSchema = Joi.object().keys({
        'songId' : Joi.string().allow("", null),
        'songTitle' : Joi.string().trim().required(),
        'artist' : Joi.string().trim().required(),
        'album' : Joi.string().trim().required(),
        'year' : Joi.number().integer(),
        'comment' : Joi.string().allow('', null).empty(['', null]),
        'genre' : Joi.string().trim().required(),
        'submittedOn' : Joi.date(),
        'submittedBy' : Joi.string().trim().required(),
        'numberOfRatings' : Joi.number().integer(),
        'averageRating' : Joi.number().integer(),
        'visibility': Joi.boolean().required()
    });


    Joi.validate(req.body,joiSchema,(err,results)=>{
        if(err) {
            console.log('error is '+err);
            res.status(400).json(err);
        }
        else {
            var newSong = new Song({
                songId: new mongoose.Types.ObjectId(),
                songTitle: req.body.songTitle,
                artist: req.body.artist,
                album: req.body.album,
                year: req.body.year,
                comment: req.body.comment,
                genre: req.body.genre,
                submittedOn: req.body.submittedOn,
                submittedBy: req.body.submittedBy,
                numberOfRatings: req.body.numberOfRatings,
                averageRating: req.body.averageRating,
                visibility: req.body.visibility
            });
        
            newSong.save().then((newsong) => {
        
                res.status(200).json(newSong);
            })
        }
    
    })
})



/*Route to get all Songs with true visibility */
router.get("/getsongs", (req, res) => {
    Song.find({ visibility: "true" }).then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to get all Songs for Admin*/
router.get("/auth/songsForAdmin", passport.authenticate('jwt', { session: false }), (req, res) => {
    Song.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to add change visibility of Song */
router.post('/auth/changevisibility', passport.authenticate('jwt', { session: false }), (req, res) => {

    Song.update({ 'songId': req.body.songId }, {
        $set: {

            visibility: req.body.visibility

        }
    }).then(() => {

        res.status(200).send();
    })
});



module.exports = router;