const express = require("express");
const router = express.Router();
const users = require("../controller/auth");

router.route("/login").post(users.postlogin);

router.route("/emaillogin").post(users.postemaillogin);

router.route("/signup").post(users.postregister);

module.exports = router;
