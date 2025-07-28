const express = require("express")
const Session = require("../models/Session")
const Conversation = require("../models/conversion")
const router = express.Router()

const newSession = async(req,res)=>{
    try{
    const userId = req.user._id;

    const session = Session.create({
        user:userId,
    })

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

export const addConversation = async (req, res) => {
  try {
    const chat = await Session.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
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

export const getConversation = async (req, res) => {
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

module.exports = {newSession,getAllsession,getConversation,addConversation}