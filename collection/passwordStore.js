const mongoose = require("mongoose");
const { User_Schema } = require("./user");
const { folderStore_Schema } = require("./folder");

const passwordStoreSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter a title."],
    },
    password: {
        type: String,
        required: [true, "please enter a password."],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User_Schema,
    },
    email: {
        type: String,
        required: [true, "please enter a your email."],
    },
    description: {
        type: String
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: folderStore_Schema,
        required: [true, "Folder Id not found or missing."],
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.passwordStore_Schema = mongoose.model("passwordStore ", passwordStoreSchema);