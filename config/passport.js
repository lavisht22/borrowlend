/* passport configuration file */

var passport = require('passport');
var passportJWT = require('passport-jwt');
var jwt = require('jsonwebtoken');
var User = require('./model').User;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'cashpositivesecretkey';
    opts.passReqToCallback = true;

    /* LenderStrategy for lender routes authorization */
    var lenderStrategy = new JwtStrategy(opts, function(req, jwt_payload, done) {
        User.findOne({email: jwt_payload.email}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                if(jwt_payload.role === 'lender'){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        });
    });

    /*BorrowerStrategy for borrower's routes */

    var borrowerStrategy = new JwtStrategy(opts, function(req, jwt_payload, done) {
        User.findOne({email: jwt_payload.email}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                if(jwt_payload.role === 'borrower'){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            } else {
                return done(null, false);
            }
        });
    });

    passport.use('lender-jwt', lenderStrategy);
    passport.use('borrower-jwt', borrowerStrategy);
}
