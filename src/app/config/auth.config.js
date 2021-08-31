const passport = require("passport");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;
const User = require("../models/user.model");
//Extract token from header and validate the kr
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SIGN_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      User.findOne({ emailAddress: token.user.emailAddress })
        .then(async (data) => {
          return done(null, data);
        })
        .catch((error) => {
          return done(error);
        });
    }
  )
);
