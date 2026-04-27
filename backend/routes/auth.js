const express =require('express')
const multer=require('multer')
const path=require('path')

// just give destiantion and filename as cb 
// 1. destination Tells Multer where to store the file
// 2. filename Tells Multer what name to save the file as 
const upload=multer({storage:multer.diskStorage({
        destination:function(req,file,cb){
         cb(null,path.join(__dirname,'..','uploads/user'))
        },
        filename:function(req,file,cb){
        //date now prevent override
           cb(null, Date.now() + '-' + file.originalname);
        }
})})


const { isAuthenticatedUser,authorizeRoles} = require('../middlewares/authenticate')

const { registerUser, 
        loginUser,
        logoutUser,
        forgotPassword, 
        getUserProfile,
        changePassword,
        updateProfile,
        getAllUsers,
        getUser,
        updateUser,
        deleteUser
     } = require('../controllers/authController')
const router=express.Router()
//Take ONE file named 'avatar', save it, and put it in req.file”
// Look inside request → find key named 'avatar' → take that file” 
// that we send from frontend formData.append("avatar", file)
router.route('/register').post(upload.single('avatar'),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
// router.route('/password/forgot').post(forgotPassword)
router.route('/password/change').put(isAuthenticatedUser,changePassword)
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile)
router.route('/update').put(isAuthenticatedUser,updateProfile)

router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser)
                               .put(isAuthenticatedUser,authorizeRoles('admin'),updateUser)
                               .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser)
module.exports=router