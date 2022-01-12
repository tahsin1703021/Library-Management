const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();


module.exports = adminRouter;