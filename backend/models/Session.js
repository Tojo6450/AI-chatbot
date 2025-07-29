const mongoose = require("mongoose")


const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    latestMessage: {
      type: String,
      default: "New Chat",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session",schema)
