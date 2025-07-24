const express = require("express");
const { register, VerifyUser } = require("../controller/userController");

const router = express.Router()

router.post("/register", register)
router.post("/verify",VerifyUser)

module.exports = router;