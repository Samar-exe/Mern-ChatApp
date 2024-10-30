const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: { type: String, required: true, minlength: 3, maxlength: 300 },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", userSchema)
module.exports= UserModel
