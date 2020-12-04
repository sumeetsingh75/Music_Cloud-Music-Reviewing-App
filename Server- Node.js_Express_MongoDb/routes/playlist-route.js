const express = require("express");
const router = express.Router();
const keys = require ("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");
const Playlist = require('../models/playlist');
const mongoose = require("mongoose");
const Joi = require('joi');

/*Route to add Playlist */
router.put('/auth/addplaylist',passport.authenticate('jwt',{session:false}),(req,res)=>{
   console.log("addplaylist");

   const joiSchema = Joi.object().keys({
    'listId' : Joi.string().allow("", null),
    'listTitle' : Joi.string().trim().required(),
    'listDesc' : Joi.string().trim().required(),
    'createdOn' : Joi.date(),
    'createdBy' : Joi.string().trim().required(),
    'visibility': Joi.boolean().required(),
    'songs' : Joi.array().optional()
});

Joi.validate(req.body,joiSchema,(err,results)=>{
    if(err) {
        console.log('error is '+err);
        res.status(400).json(err);
    }
    else {

        var newPlaylist = new Playlist({
            listId: new mongoose.Types.ObjectId(),
            listTitle: req.body.listTitle,
            listDesc: req.body.listDesc,
            createdOn: req.body.createdOn,
            createdBy: req.body.createdBy,
            visibility: req.body.visibility,
            songs: req.body.songs
           });
           
           newPlaylist.save().then((newplaylist)=>{
            
               res.status(200).json(newplaylist);
           })
    }})
  
})

/*Route to edit Playlist */
router.post('/auth/editplaylist',passport.authenticate('jwt',{session:false}),(req,res)=>{
   
    const joiSchema = Joi.object().keys({
        'listId' : Joi.string().allow("", null),
        'listTitle' : Joi.string().trim().required(),
        'listDesc' : Joi.string().trim().required(),
        'createdOn' : Joi.date(),
        'createdBy' : Joi.string().trim().required(),
        'visibility': Joi.boolean().required(),
        'songs' : Joi.array().optional(),
        '__v' : Joi.number().integer().optional(),
        '_id' : Joi.string().optional()

    });
    Joi.validate(req.body,joiSchema,(err,results)=>{
        if(err) {
            console.log('error is '+err);
            res.status(400).json(err);
        }
        else {
            Playlist.update({'listId':req.body.listId},{$set:{
                listTitle: req.body.listTitle,
                listDesc: req.body.listDesc,
                createdOn: req.body.createdOn,
                createdBy: req.body.createdBy,
                visibility: req.body.visibility,
                songs: req.body.songs
            }}).then(()=>{
              
                res.status(200).send();
            })

        }})
    

  
 })
 
/*Route to change visbility of Playlist */
 router.post('/auth/changevisibility',passport.authenticate('jwt',{session:false}),(req,res)=>{
  
    Playlist.update({'listId':req.body.playlistId},{$set:{
        
        visibility: req.body.visibility
       
    }}).then(()=>{
       
        res.status(200).send();
    })
 })
 
 /*Route to retrive Playlists that are not hidden */
router.get("/getplaylists", (req, res) => {
    Playlist.find({visibility: "true"}).then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});

/*Route to retrive all Playlists*/
router.get("/auth/getplaylists", passport.authenticate('jwt',{session:false}),(req, res) => {
    Playlist.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });

});




module.exports = router;