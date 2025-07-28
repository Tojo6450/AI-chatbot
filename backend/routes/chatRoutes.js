const express = require("express")
const {newSession,getAllsession,getConversation,addConversation} = require("../controller/chatController")

const router = express.Router();

router.post("/new", isAuth, newSession);
router.get("/all", isAuth, getAllsession);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);

module.exports = router