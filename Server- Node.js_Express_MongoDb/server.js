 const express = require("express");
 const morgan = require("morgan");
 const app = express();
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
 const keys = require ("./config/keys");

mongoose.connect(keys.mongodb.dbURI,
{ useNewUrlParser: true },
(error)=>{
    if(!error)
        console.log("success");
     else
        console.log("Failure");   
});

app.use(bodyParser.json());

 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
    next();
  });
  
const userRoute =  require("./routes/user");
app.use('/auth',userRoute); 
const songRoute =  require("./routes/song-route");
app.use('/song',songRoute); 
const reviewRoute =  require("./routes/review-route");
app.use('/review',reviewRoute); 
const playlistRoute =  require("./routes/playlist-route");
app.use('/playlist',playlistRoute); 
const port = process.env.PORT || 3000;
app.listen(port);