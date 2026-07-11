const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Please add a nom field"]
    },
    prenom: {
        type: String,
        required: [true, "Please add a prenom field"]
    },
    email: {
        type: String,
        required: [true, "Please add a email field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password field"]
    },
    telephone:{
        type: String,
        required: [true, "Please add a telephone field"]
    },
    role: {
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);