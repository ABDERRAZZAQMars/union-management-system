const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getUserData} = require('../controllers/UserController')

const { protect } = require('../middlewares/authMiddleware')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getUserData);

module.exports = router