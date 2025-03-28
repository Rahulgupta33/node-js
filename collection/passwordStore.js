const mongoose = require("mongoose");
const { User_Schema } = require("./user");

const passwordStoreSchema = mongoose.Schema({
    key: {
        type: String,
        required: [true, "please enter a key or name"],
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User_Schema,
    },
    app: {
        type: String,
        required: [true, "please enter a your app name"],
    },
    description : {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.passwordStore_Schema = mongoose.model("passwordStore ", passwordStoreSchema);