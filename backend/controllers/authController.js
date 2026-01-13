const catchAsyncError=require('../middlewares/catchAsyncError')
const User=require('../models/userModel')
const sendEmail = require('../utils/email')
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

 exports.logoutUser=(req,res,next)=>{
    //just setting cookie value as null if logout route hit
   res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    .status(200)
    .json({
        success:'true',
        message:'logged out'
    })
 }

//  exports.forgotPassword= catchAsyncError(async (req,res,next)=>{
//    const user=await User.findOne({email:req.body.email})

//    // check email exist
//    if(!user){
//     return next(new ErrorHandler('user not found with email',404))
//    }
//    //call getResetToken function and saving that paaswordToken and expiry
//    const resetToken=user.getResetToken()
//    await user.save({validateBeforeSave:false})

//    //create reset url
//    const resetUrl=`${http}://${req.get('host')}/api/v1/password/reset/${resetToken}`

//    const message=`Your Password reset url is \n\n
//    ${resetUrl}\n\n If you not requested this email ,then ignore it`

//    try {
//           sendEmail({
//             email: user.email,
//             subject: "JVLcart Password Recovery",
//             message
//         })

//         res.status(200).json({
//             success: true,
//             message: `Email sent to ${user.email}`
//         })

//    } catch (error) {
//     user.resetPasswordToken=undefined;
//     user.resetPasswordTokenExpire=undefined;
//     await user.save({validateBeforeSave:false})
//     return next(new ErrorHandler(error.message),500)
//    }
   
//  })


//get user profile who logged in currently
exports.getUserProfile=catchAsyncError(async (req,res,next)=>{
   const user= await User.findById(req.user.id)
   res.status(200).json({
    success:'true',
    user 
  })
})


exports.changePassword=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password')
    //check old  password
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('old password not match',401))
    }
    //assign new password how it save hash because of  pre moongo userModel ai said
    user.password=req.body.password
    await user.save()
    res.status(201).json({
        success:true,
    })
})

//update profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
  const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        user
    })

})

// Admin: get all users
//if logged in user must admin he access to all admin routes we protected 
//routes auth.js check
exports.getAllUsers=catchAsyncError(async (req,res,next)=>{
   const users=  await User.find()
   res.status(200).json({
    success:true,
    users
   })
})

// Admin: get specific users
//logged in admin allowed to send specific id by req.params
exports.getUser=catchAsyncError(async(req,res,next)=>{
   const user=await User.findById(req.params.id)
   if(!user){
    return(new ErrorHandler(`user not found with this Id${req.params.id}`))
   }

   res.status(200).json({
    success:true,
    user
   })
})


// Admin: Update user
//logged in admin allowed to send specific id by req.params and role field also 
//changeable by admin to any specific user
exports.updateUser=catchAsyncError(async(req,res,next)=>{
     const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
      const user= await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })

    res.status(201).json({
        success:true,
        user
    })
})

// Admin: delete user
//logged in admin allowed to send specific id by req.params 
//so admin can delete any user by just id

exports.deleteUser=catchAsyncError(async(req,res,next)=>{
 const user= await User.findByIdAndDelete(req.params.id)
 res.status(201).json({
        success:true,
    })

})