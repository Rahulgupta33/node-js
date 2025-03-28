//App
const express = require("express");
const app = require("../app");

//import collection
const { signupController, loginController, getMyInfo, } = require("../controller");

//Middleware
const { isAuthenticated } = require("../middleware/isAuth");

const authRoute = express.Router();

authRoute.route("/signup").post(signupController);
authRoute.route("/login").post(loginController);

// Info
authRoute.route("/myinfo").get(isAuthenticated, getMyInfo);


const auth = app.use("/", authRoute);

module.exports = { auth };