const passport = require("passport");
const LOCALSTRATEGY = require("passport-local").Strategy;
const { ExtractJwt, Strategy } = require("passport-jwt");
const User = require("../models/user");
const config = require("../config");

const localOptions = {
  usernameField: "email",
};

const localStrategy = new LOCALSTRATEGY(localOptions, async function (
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email: email });
    if (!user) return done(null, false);

    const matchedUser = await user.comparePassword(password);
    if (!matchedUser) return done(null, false);

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

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

passport.use(localStrategy);
passport.use(JwtStrategy);
