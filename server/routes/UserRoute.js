const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getUserData, getUsers, deleteUser,updateUser, getUserById} = require('../controllers/UserController')

const { protect } = require('../middlewares/authMiddleware')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/users").get(protect, getUsers);
router.route("/me").get(protect, getUserData);
router.route("/:id").get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);


module.exports = router