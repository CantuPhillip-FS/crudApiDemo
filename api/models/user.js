const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const userScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: "Email address is required",
      validate: [validateEmail, "Invalid Email"],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

userScheme.pre("save", (next) => {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    // run hasing and salting
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    // skip hasing and salting
    next();
  }
});

module.exports = mongoose.model("User", userScheme);
