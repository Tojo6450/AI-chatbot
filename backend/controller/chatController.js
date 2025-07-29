const express = require("express")
const Session = require("../models/Session")
const Conversation = require("../models/conversion")
const {GoogleGenAI} = require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const router = express.Router()

const newSession = async(req,res)=>{
    try{
    const userId = req.user._id;

    const session = await Session.create({
        user:userId,
    })
  //  console.log(userId)
    res.status(200).json(session)}
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const getAllsession = async(req,res)=>{
    try{
     const sessions = await Session.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(sessions);

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

 const addConversation = async (req, res) => {
  try {
    const chat = await Session.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });
    
      const {prompt} = req.body;
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash-lite",
        contents:prompt,
    });

   let rawText = response.text;

    const conversation = await Conversation.create({
      session: chat._id,
      question: prompt,
      answer: rawText,
    });

    const updatedChat = await Session.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });

    if (!conversation)
      return res.status(404).json({
        message: "No conversation with this id",
      });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await Session.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {newSession,getAllsession,getConversation,addConversation,deleteChat}