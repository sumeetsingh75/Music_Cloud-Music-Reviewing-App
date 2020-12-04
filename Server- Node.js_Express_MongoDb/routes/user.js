const express = require("express");
const router = express.Router();
const User = require("../models/user");
const keys = require("../config/keys");
const JWT = require("jsonwebtoken");
const passport = require('passport');
const passportConfig = require("../config/passport-setup");

/*Method to sign JWT Token */
signToken = user => {
    return JWT.sign({
        iss: 'MusicloudAPI',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, keys.jwt.secret);
}

/*Route to add new User */
router.put('/signup', (req, res) => {
    console.log("signup");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    userExist: boolean = false;
    User.find()
        .then(data => {

            for (var i = 0; i < data.length; i++) {
                if (data[i].local && data[i].local.email == email)
                    this.userExist = true;
            }

            if (this.userExist) {

                res.status(202).json("User Exists!");
            }
            else {
                const newUser = new User({
                    method: "local",
                    local: {
                        name: name,
                        email: email,
                        password: password
                    },
                    role: "non-admin",
                    status: "activated"

                });


                newUser.save().then((newuser) => {
                    const token = signToken(newuser);
                    res.status(200).json({ token: token });
                }).catch(err => {
                    res.json({ message: err });
                })
            }

        })
        .catch(err => {
            res.json({ message: err });
        });


});

/*Route for Local signin */
router.post('/signin', passport.authenticate('local', { session: false }), (req, res) => {

    const token = signToken(req.user);
    res.status(200).json({ token: token, user: req.user });

});

/*Route to get all users for admin */
router.get('/getusers', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find().then(data => {
        res.json(data);
    })
        .catch(err => {
            res.json({ message: err });
        });


});

/*Route to get Activate/Deactivate user */
router.post('/user/changeStatus', passport.authenticate('jwt', { session: false }), (req, res) => {


    User.findByIdAndUpdate(req.body.user.userId, {
        $set: {

            status: req.body.status
        }
    }).then(() => {

        res.status(200).send();
    })

});

/*Route to make user admin/non-admin */
router.post('/user/changeRole', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("changeRole");


    User.findByIdAndUpdate(req.body.user.userId, {
        $set: {

            role: req.body.role
        }
    }).then(() => {

        res.status(200).send();
    })

});

/*Route for Facebook Signin */
router.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }), (req, res, next) => {

    const token = signToken(req.user);
    console.log("token is " + token);
    res.status(200).json({ token: token, user: req.user });

});
module.exports = router;