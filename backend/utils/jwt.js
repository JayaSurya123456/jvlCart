const sendToken=(User,statusCode,res)=>{
    const token=User.getJwtToken()

    // setting cookie
    const option={
     expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME  * 24 * 60 * 60 * 1000 
            ),
            httpOnly:true,
        }

    res.status(statusCode)
    .cookie('token',token,option)
    .json({
        success:true,
        token,
        User
    })
}

module.exports =sendToken