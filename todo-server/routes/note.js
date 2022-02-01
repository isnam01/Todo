const express = require("express");
const router = express.Router();
const notes = require("../controller/note");
const authenticateLogin=require('../middleware/authenticateLogin')

router.route("/note").post(authenticateLogin,notes.postNote);
router.route("/note").get(authenticateLogin,notes.getNote);


module.exports = router;
