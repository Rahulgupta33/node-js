const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "please enter a email"],
        unique: [true, "email already exist"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [8, "password must be at least 8 letter"],
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports.User_Schema = mongoose.model("users ", userSchema);