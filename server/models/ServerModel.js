const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add a text field"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Server", serverSchema);