//Auth
const {
    signupController,
    loginController,
    getMyInfo
} = require("./user");

//Password Store
const {
createPasswordStore,
getPassword,
getMyPasswords
} = require("./passwordStoreController");


//Folder Store
const {
    createFolder,
    getMyFolders
} = require("./folderStoreControllere");


module.exports = {
    signupController,
    loginController,
    getMyInfo,
    createPasswordStore,
    getPassword,
    getMyPasswords,
    createFolder,
    getMyFolders
};