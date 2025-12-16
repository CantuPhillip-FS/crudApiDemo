const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userScheme);
