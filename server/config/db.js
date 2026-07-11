const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = () => { mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Connected to DATABASE");
    })
    .catch((err) => { console.log("Unable to Connect to DATABASE", err);
    });
};

module.exports = connectDB;