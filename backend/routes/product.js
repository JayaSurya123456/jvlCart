
const express =require('express')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/authenticate')
const { getProducts, newproduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const router=express.Router()

router.route('/products').get(isAuthenticatedUser,getProducts)
router.route('/product/:id')
                            .get(getSingleProduct)
                            .put(updateProduct)
                            .delete(deleteProduct)

//admin route
router.route('admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newproduct)


module.exports=router