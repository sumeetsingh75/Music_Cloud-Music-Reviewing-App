const passport = require("passport");
const jwtStarategy = require("passport-jwt").Strategy;
const LocalStarategy = require("passport-local").Strategy;
const FacebookTokenStarategy = require("passport-facebook-token");
const { ExtractJwt } = require("passport-jwt");
const keys = require("./keys");
const User = require("../models/user");

/*Passport Strategy to Validate token */
passport.use(new jwtStarategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwt.secret
}, (payLoad, done) => {
    try {
        //find user in token

        const user = User.findById(payLoad.sub);
        //if user doesnt exist, handle it

        if (!user) {
            return done(null, false);
        }

        //otherwise return user
        done(null, user);
    } catch (error) {

        done(error, false);
    }

}));

/*Passport Strategy for Facebook user */
passport.use('facebookToken', new FacebookTokenStarategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    try {

        const existingUser = User.findOne({ "facebook.id": profile.id }).then((res) => {

            if (res) {

                return done(null, res);
            }

            //if new account
            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.name.givenName
                },
                role: "non-admin",
                status: "activated"
            });

            newUser.save().then((res) => {

                if (res) {
                    done(null, res);
                }

            }).catch((err) => {
                console.log("promise error" + err);
            }
            );

        }).catch((err) => {
            console.log("Promise rejected" + err);
        });

    } catch (error) {

        done(error, false, error.message);
        next(err);
    }


}));

/*Passport Strategy to Validate Local User */
passport.use('local', new LocalStarategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try {
        //find user given mail
        const user = await User.findOne({ "local.email": email });

        //if not handle it
        if (!user) {

            return done(null, false);
        }

        //if foound check if coredct password

        const isMatch = await user.isValidPassword(password);
        //if not handle it

        if (!isMatch) {
            return done(null, false);
        }

        //otherwise return user
        done(null, user);
    } catch (error) {

        done(error, false);
    }

}));

