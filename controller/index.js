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
getMyPasswords,
geyMyPasswordFolder
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
    //Password Store
    createPasswordStore,
    getPassword,
    getMyPasswords,
    geyMyPasswordFolder,
    //Folder Store
    createFolder,
    getMyFolders
};