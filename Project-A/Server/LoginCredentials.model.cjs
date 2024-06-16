//import mongoose from "mongoose";
const mongoose = require("mongoose");

const LoginCredSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const LoginCredentials = mongoose.model("LoginCredentials", LoginCredSchema);
module.exports = LoginCredentials;
