const mongoose = require("mongoose");
const { User_Schema } = require("./user");

const folderSchema = mongoose.Schema({
    folderName: {
        type: String,
        required: [true, "please enter a folder name"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User_Schema,
    },
    description: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.folderStore_Schema = mongoose.model("folderStore ", folderSchema);