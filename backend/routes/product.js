
const express =require('express')
const { isAuthenticatedUser } = require('../middlewares/authenticate')
const { getProducts, newproduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const router=express.Router()

router.route('/products').get(isAuthenticatedUser,getProducts)
router.route('/product/new').post(newproduct)
router.route('/product/:id').get(getSingleProduct)
.put(updateProduct)
.delete(deleteProduct)

module.exports=router