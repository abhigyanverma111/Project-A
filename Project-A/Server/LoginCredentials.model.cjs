//import mongoose from "mongoose";
const mongoose = require("mongoose");

const LoginCredSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginCredentials = mongoose.model("login_credentials", LoginCredSchema);
module.exports = LoginCredentials;
