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

// userSchema.pre("save", function (next) {
//   const user = this;
//   if (user.isNew || user.isModified("password")) {
//     bcrypt.genSalt(10, (error, salt) => {
//       if (error) { return next(error); }
//       bcrypt.hash(user.password, salt, null, (error, hash) => {
//         if (error) { return next(error); }
//         user.password = hash;
//         next();
//       });
//     });
//   } else { next(); }
// });

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

module.exports = mongoose.model("User", userSchema);
