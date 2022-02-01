const express = require("express");
const router = express.Router();
const users = require("../controller/user");
const authenticateLogin=require('../middleware/authenticateLogin')

router.route("/user").get(authenticateLogin,users.getuser);


module.exports = router;
