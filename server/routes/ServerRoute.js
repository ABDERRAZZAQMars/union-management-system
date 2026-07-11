const express = require('express')
const router = express.Router()

const { getServer, setServer, updateServer, deleteServer } = require('../controllers/ServerController')

router.route("/").get(getServer).post(setServer);
router.route("/:_id").put(updateServer).delete(deleteServer);

module.exports = router