const express = require("express");
const router = express.Router();
const keys = require ("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Review = require('../models/review');
const Song = require('../models/songs');
const mongoose = require("mongoose");
const Joi = require('joi');

/*Route to add new Review */
router.put('/auth/addreview',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const joiSchema = Joi.object().keys({
        'reviewId' : Joi.string().allow("", null),
        'songId' : Joi.string().trim().required(),
        'submittedOn' : Joi.date(),
        'submitedBy' : Joi.string().trim().required(),
        'reviewDesc' : Joi.string().trim().required(),
        'rating' : Joi.number().integer(),
        'visibility': Joi.boolean().required()
    });
    Joi.validate(req.body,joiSchema,(err,results)=>{
        if(err) {
            console.log('error is '+err);
            res.status(400).json(err);
        }
        else {
            var newReview = new Review({
                reviewId: new mongoose.Types.ObjectId(),
                songId: req.body.songId,
                submittedOn: req.body.submittedOn,
                submitedBy: req.body.submitedBy,
                reviewDesc: req.body.reviewDesc,
                rating: req.body.rating,
                visibility: req.body.visibility,
               });
               
               newReview.save().then((newreview)=>{
                  
                   Song.findOneAndUpdate({'songId':req.body.songId},{$inc: {
                    numberOfRatings: 1 
                  }}).then(()=>{
                  
                  
                })
                .catch(err=>{
                    res.json({ message: err });
                   })
            
                res.status(200).json(newreview);
               }).catch(err=>{
                res.json({ message: err });
               });


        }})


  

});

/*Route to get  Reviews */
router.get("/getreviews", (req, res) => {
    Review.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to delete all Reviews */
router.delete("/auth/deleteAllReviews",passport.authenticate('jwt',{session:false}),(req,res)=>{
   

    Review.deleteMany({  songId: req.body.songId })
            .then(data => {
            if(data)
                res.status(200).send();
            else
                res.status(404).send();    
            })
        .catch(err => {
            console.log(err);
            res.json({ message: err });
        });
}); 



module.exports = router;