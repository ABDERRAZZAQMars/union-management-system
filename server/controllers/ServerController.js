const asyncHandler = require('express-async-handler');

const Server = require('../models/ServerModel');

// method : GET
// url : /
// access : Private
const getServer = asyncHandler(async (req, res) => {
    const server = await Server.find();
    res.status(200).json(server);
});

// method : POST
// url : /
// access : Private
const setServer = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400).json({ message: "Please add a text field" });
        throw new Error("Please add a text field");
    } else {
        const server = await Server.create({
        text: req.body.text
    });
    res.status(200).json(server);
    }
});

// method : PUT
// url : /:id
// access : Private
const updateServer = asyncHandler(async (req, res) => {
    const server = await Server.findById(req.params._id);
    if (!server) {
        res.status(400);
        throw new Error("Server not found");
    }
    const updatedServer = await Server.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json(updatedServer);
});

// method : DELETE
// url : /:id
// access : Private
const deleteServer = asyncHandler(async (req, res) => {
    const server = await Server.findById(req.params._id);
    if (!server) {
        res.status(400);
        throw new Error("Server not found");
        console.log(server);
    }
    await Server.findByIdAndDelete(req.params._id);
    res.status(200).json({ id: req.params._id });
});

module.exports = {
    getServer,
    setServer,
    updateServer,
    deleteServer
}