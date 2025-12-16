const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Strategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const config = require("../config");

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

const JwtStrategy = new Strategy(jwtOptions, async function (payload, done) {
  try {
    const user = await User.findById(payload.sub);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(JwtStrategy);
