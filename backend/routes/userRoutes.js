const express = require("express");
const { register, VerifyUser, myProfile } = require("../controller/userController");
const { isAuth } = require("../Middleware/isAuth");

const router = express.Router()

router.post("/register", register)
router.post("/verify",VerifyUser)
router.get("/myProfile",isAuth,myProfile)

module.exports = router;