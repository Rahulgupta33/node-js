const express = require("express");
const app = require("../app");
const { createFolder, getMyFolders } = require("../controller");


const { isAuthenticated } = require("../middleware/isAuth");


// Encrypt and Decrypt Route
const folderStoreRoute = express.Router();


folderStoreRoute.route("/newFolder").post(isAuthenticated, createFolder);
folderStoreRoute.route("/getMyFolders").get(isAuthenticated, getMyFolders);

const folderStore = app.use("/", folderStoreRoute);

module.exports = { folderStore };
