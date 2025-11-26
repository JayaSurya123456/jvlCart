const catchAsyncError=require('../middlewares/catchAsyncError')
const User=require('../models/userModel')
const ErrorHandler=require('../utils/errorHandler')
const sendToken=require('../utils/jwt')

exports.registerUser=catchAsyncError(async(req,res,next)=>{
   const {name,email,password,avatar}=req.body
   const user= await User.create({
        name,
        email,
        password,
        avatar
    })
    // const token=user.getJwtToken()
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token
    // })

    //instead of commented code 
    sendToken(user,201,res)
   
}) 

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body

    //check not empty
    if(!email || !password){
        return next(new ErrorHandler('Please Enter Email & Password',400))
    }
    //   select: false in userModel so i use .select for password
    const user=await User.findOne({email}).select('+password')

    //if no user find using email and password return error
    if(!user){
        return next(new ErrorHandler('Invalid Email & Password',401))
    }

    //i have this method isValidPassword in userModel return true or false
    if(!await user.isValidPassword(password)){
      return next(new ErrorHandler('Invalid Email & Password',401))
    }

  
    sendToken(user,201,res)

})