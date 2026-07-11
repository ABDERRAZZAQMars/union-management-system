const asyncHandler = require('express-async-handler');

// method : GET
// url : /
// access : Private
const getServer = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Welcome to UNION MANAGEMENT SYSTEM" });
});

// method : POST
// url : /
// access : Private
const setServer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ message: "Please add a text field" });
        throw new Error("Please add a text field");
    } else {
        res.status(200).json({ message: `SET to UNION MANAGEMENT SYSTEM ${req.body.text}` });
    }
});

// method : PUT
// url : /:id
// access : Private
const updateServer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    } else {
        res.status(200).json({ message: `UPDATE to UNION MANAGEMENT SYSTEM ${req.params._id}` });
    }
});

// method : DELETE
// url : /:id
// access : Private
const deleteServer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    } else {
        res.status(200).json({ message: `DELETE from UNION MANAGEMENT SYSTEM ${req.params._id}` });
    }
});

module.exports = {
    getServer,
    setServer,
    updateServer,
    deleteServer
}