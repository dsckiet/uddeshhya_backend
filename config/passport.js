const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../models/Admin');
require("dotenv").config();

//To authenticate The user
module.exports = (userType, passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = process.env.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        Admin.getAdminById(jwt_payload.data._id, (err, user) => {

            if (err) return done(err, false);
            if (user) return done(null, user);
            return done(null, false);
        });
    }));
}