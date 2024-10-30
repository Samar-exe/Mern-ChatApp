const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

// =======================Create a Token =========================================
const createToken =(_id)=>{

    return jwt.sign({ _id }, process.env.REACT_APP_JWT_SECRET, {
        expiresIn: '3d'
        })
}

//========================Register User ==========================================
const registerUser = async (req,res)=>{ 

    const {name,email,password} = req.body;
    try{

        let user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({message:'Email already exists'})   
        }
        if(!name|| !email|| !password){
            return res.status(400).json({message:'Please fill in all fields'})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:'Invalid email'})
        }
    
        user = new userModel({name,email,password})
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
    
        await user.save()
    
        const token = createToken({_id: user._id})
        res.status(201).json({name, email, token,_id: user._id})
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//=========================Login User ===========================================
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        let user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const token = createToken({_id: user._id})
        res.status(200).json({name:user.name, email, token,_id: user._id})
        
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//=========================Find User ===============================================
const findUser = async (req,res)=>{
    const userId = req.params.userId
    try{
        const user = await userModel.findById(userId)
        res.json(user)   
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//=========================Get All the Users==========================================
const getAllUsers = async (req,res)=>{
    try{
        const users = await userModel.find()
        res.json(users)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = {registerUser,loginUser,findUser,getAllUsers}