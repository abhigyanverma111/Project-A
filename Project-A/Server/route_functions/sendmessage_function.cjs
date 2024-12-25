const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const login_credentials = require("../LoginCredentials.model.cjs");
const active_chats = require("../ActiveChats.model.cjs");
const active_sessions = require("../ActiveSessions.model.cjs");
const messages = require("../Messages.model.cjs");

const sendmessage_function = async (req, res) => {
  const { receiver, message } = req.body;
  const sender = req.cookies.username; // Get the sender from the cookie

  if (!sender) {
    return res.status(400).json({
      status: "failed",
      message: "Sender not found in cookies",
    });
  }

  try {
    const newMessage = new messages({
      sender,
      receiver,
      message,
      time: new Date(),
    });

    await newMessage.save();

    res.json({
      status: "approved",
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
    });
  }
};

module.exports = sendmessage_function;
