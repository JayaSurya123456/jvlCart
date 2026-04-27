
const express =require('express')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/authenticate')
const { getProducts, newproduct, getSingleProduct,
     updateProduct, deleteProduct, createReview, 
     getReviews,
     deleteReviews} = require('../controllers/productController')
const router=express.Router()

//isauthenticate
router.route('/products').get(getProducts)
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)

//admin route
router.route('admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newproduct)

router.route('/review').post(isAuthenticatedUser,createReview)
router.route('/getReview').get(isAuthenticatedUser,getReviews)
router.route('/deleteReview').delete(isAuthenticatedUser,deleteReviews)


module.exports=router