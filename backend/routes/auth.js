const express =require('express')
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

router.route('/register').post(registerUser)
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