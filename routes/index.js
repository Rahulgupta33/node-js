const { auth } = require("./user");
const { passwordStore } = require("./passwordStoreRoutes");
const { folderStore } = require("./folderStoreRoutes");

module.exports = {
    auth,
    passwordStore,
    folderStore
};