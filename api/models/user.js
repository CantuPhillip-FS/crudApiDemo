const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const userSchema = new mongoose.Schema(
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

userSchema.pre("save", async function () {
  const user = this;

  if (!user.isNew && !user.isModified("password")) {
    return;
  }

  const salt = await new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      else resolve(salt);
    });
  });

  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });

  user.password = hash;
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
