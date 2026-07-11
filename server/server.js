const dotenv = require('dotenv').config()
const express = require('express')
const { errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

connectDB();

const app = express();
const port = process.env.PORT || 8081

const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/',require('./routes/ServerRoute'));

//Error_Handler
app.use(errorHandler);

app.listen(port, (err) => {
if (!err) {
console.log(`Server started on port ${port}`)
} else { console.log(err)}
});



module.exports = app