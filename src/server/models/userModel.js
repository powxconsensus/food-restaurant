const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    maxlength: 20,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    required: [true, "Please provide your Number"],
  },
  DOB: {
    type: String,
  },
  userPhoto: String,
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },
  address: [
    {
      houseNo: String,
      roadName: String,
      pinCode: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.CheckPass = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
