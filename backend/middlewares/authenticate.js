const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    //getting only cookie
    const {token}=req.cookies
    // check token not exist
    if(!token){
       return next(new ErrorHandler('Login to Access resource',401))
    }
    //getting original Id
    const decoded =  jwt.verify(token,process.env.JWT_SECRET)
    //Without req.user, we don’t know who is logged in.
    req.user=await User.findById(decoded.id)
    next()
})


exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        // checking passed role not exist in req user
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`),401)
        }
        //if exist allowed to next middleware
        next()
    }
}