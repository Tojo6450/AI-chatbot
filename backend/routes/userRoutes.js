const express = require("express");
const { register, VerifyUser, myProfile } = require("../controller/userController");

const router = express.Router()

router.post("/register", register)
router.post("/verify",VerifyUser)
router.get("/myProfile",protect,myProfile)

module.exports = router;