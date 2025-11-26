const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    //getting only cookie
    const {token}=req.cookies
    if(!token){
       return next(new ErrorHandler('Login to Access resource',401))
    }
    const decoded =  jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id)
    console.log(decoded)
    next()
})