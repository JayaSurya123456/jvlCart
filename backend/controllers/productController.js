
const ErrorHandler=require('../utils/errorHandler')
const Product=require('../models/productModel')
const APIfeatures= require('../utils/apiFeatures')

//http:localhost:8000/api/v1/products
exports.getProducts= async(req,res,next)=>{
   let resPerPage=2
  const apiFeatures=new APIfeatures(Product.find(),req.query).search().filter().paginate(resPerPage)
  const products= await apiFeatures.query;
    res.status(200).json({
        success:true,
        count:products.length,
        products
    })
}

// http:localhost:8000/api/v1/product/new
exports.newproduct=async(req,res,next)=>{
// assign logged user id to user:objId in products collection  
req.body.user=req.user.id
const product=await Product.create(req.body)
res.status(201).json({
    success:true,
    product
})
}

//http:localhost:8000/api/v1/product/691c7dee4c8133596213e141
exports.getSingleProduct= async(req,res,next)=>{
   const product= await Product.findById(req.params.id)
   if(!product){
     return next(new ErrorHandler('product not found',400))
    }
   
   res.status(201).json({
    success:true,
    product
   })
}

//Put method http://localhost:8000/api/v1/product/691c7dee4c8133596213e141
exports.updateProduct= async(req,res,next)=>{
   let product= await Product.findById(req.params.id)
   if(!product){
     return res.status(400).json({
        success:false,
        message:"product not found"
    })
   }

  product=await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
   })

   res.status(200).json({
    success:true,
    product
   })
}

//Delete method http://localhost:8000/api/v1/product/691c7dee4c8133596213e141
exports.deleteProduct=async(req,res,next)=>{
   const product= await Product.findById(req.params.id)
   if(!product){
     return res.status(400).json({
        success:false,
        message:"product not found"
    })
   }
   await product.deleteOne()
   res.status(200).json({
    success:true,
    message:'product deleted'
   })
}