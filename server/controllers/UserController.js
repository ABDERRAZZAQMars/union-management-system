const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');

const User = require('../models/UserModel');

// method : POST
// url : /user/register
// access : Private

const registerUser = asyncHandler(async (req, res) => {
    const { nom, prenom,email, password, telephone, role} = req.body;
    
    if (!nom || !prenom || !email || !password || !telephone) {
        res.status(400)
        throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        telephone,
        role
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data");
    }
});

// method : POST
// url : /user/login
// access : Private

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Invalid credentials");
    }
});

//Get user data
const getUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404)
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// method : POST
// url : /user/users
// access : Private

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
});

// method : DELETE
// url : /user/:id
// access : Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: "User deleted successfully" });
});

// GET single user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

// UPDATE user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const updateData = { ...req.body };

    if (!updateData.password) {
        delete updateData.password;
    } else {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    res.status(200).json(updatedUser);
});

module.exports = {
    registerUser,
    loginUser,
    getUserData,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    generateToken,
    
}