//Auth
const {
    signupController,
    loginController,
    getMyInfo
} = require("./user");

//Auth
const {
createPasswordStore,
getPassword,
getMyPasswords
} = require("./passwordStoreController");

module.exports = {
    signupController,
    loginController,
    getMyInfo,
    createPasswordStore,
    getPassword,
    getMyPasswords
};