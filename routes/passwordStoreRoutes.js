const express = require("express");
const app = require("../app");
const { createPasswordStore, getPassword, getMyPasswords, geyMyPasswordFolder } = require("../controller");


const { isAuthenticated } = require("../middleware/isAuth");


// Encrypt and Decrypt Route
const passwordStoreRoute = express.Router();


passwordStoreRoute.route("/savePassword").post(isAuthenticated, createPasswordStore);
passwordStoreRoute.route("/getPassword").get(isAuthenticated, getPassword);
passwordStoreRoute.route("/getMyPasswords").get(isAuthenticated, getMyPasswords);
passwordStoreRoute.route("/geyMyPasswordFolder").get(isAuthenticated, geyMyPasswordFolder);

const passwordStore = app.use("/", passwordStoreRoute);

module.exports = { passwordStore };
