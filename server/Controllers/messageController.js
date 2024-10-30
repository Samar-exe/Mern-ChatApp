const messageModel = require('../Models/messageModel')

//=================Create Messages=====================================
const createMessage = async(req,res)=>{
    const {chatId,senderId,text} = req.body
    const message = new messageModel({
        chatId,senderId,text
    })
    try{
        const response = await message.save()
        res.status(201).json(response)

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//=============================Get Message====================================
const getMessage = async(req,res)=>{
    const {chatId} = req.params
    try{
        const messages = await messageModel.find({chatId})
        res.status(201).json(messages)

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {createMessage,getMessage}