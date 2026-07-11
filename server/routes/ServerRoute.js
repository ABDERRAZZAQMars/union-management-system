const express = require('express')
const router = express.Router()

const { getServer, setServer, updateServer, deleteServer } = require('../controllers/ServerController')

const { protect } = require('../middlewares/authMiddleware')

router.route("/").get(protect, getServer).post(protect, setServer);
router.route("/:_id").put(protect, updateServer).delete(protect, deleteServer);

module.exports = router