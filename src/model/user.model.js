const mongoose = require("mongoose");

// User Schema //
const userSchema = new mongoose.Schema({
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    createDate:{
        type:String,
    }
});


module.exports = mongoose.model("User", userSchema);