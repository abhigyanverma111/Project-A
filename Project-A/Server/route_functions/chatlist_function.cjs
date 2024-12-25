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

const chatlist_function = async (req, res) => {
  const { username, sessionid } = req.cookies;

  try {
    const user = await login_credentials.findOne({ username });
    if (!user) {
      console.log("Username or email not found");
      return res.status(400).json({
        msg: "Username or email not found",
        status: "failed",
      });
    }

    const session = await active_sessions.findOne({ username });
    if (!session) {
      console.log("Session not found");
      return res.status(400).json({
        msg: "Session error, please login",
        status: "failed",
      });
    }

    if (session.sessionid === sessionid) {
      console.log("Record matched");

      const chats = await active_chats.find({
        username,
      });

      return res.json({ status: "approved", chats });
    } else {
      console.log("Session mismatch");
      return res.status(400).json({
        msg: "Bad login",
        status: "failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = chatlist_function;
