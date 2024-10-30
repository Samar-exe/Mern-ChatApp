const mongoose = require('mongoose')
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat",chatSchema)
module.exports = chatModel