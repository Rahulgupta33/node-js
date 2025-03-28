//Require
const express = require("express");
const cors = require("cors");
const app = express();
const cookie = require("cookie-parser")

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookie());

module.exports = app;