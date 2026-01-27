
const ErrorHandler=require('../utils/errorHandler')
const Product=require('../models/productModel')
const catchAsyncError = require('../middlewares/catchAsyncError')
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


//create review api/v1/review

exports.createReview=catchAsyncError(async(req,res,next)=>{
    const  { productId, rating, comment } = req.body;

    // ready review object to push 
    const reviews={
      user:req.user.id,
      rating,
      comment
    }

   const product=await Product.findById(productId)
   // check user already reviewed
   const isReviewed=product.reviews.find((review)=>{
   return review.user.toString()==req.user.id.toString()
   })

   if(isReviewed){
    // update review
    product.reviews.forEach((review)=>{
        if(review.user.toString()==req.user.id.toString()){
             review.comment = comment
             review.rating = rating
        }
    })
   }
   else{
    // add new review
       product.reviews.push(reviews)
       product.numOfReviews=product.reviews.length
   }
 //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true
    })

})

//Get reviews query via parameter
exports.getReviews=catchAsyncError(async (req,res,next)=>{
const product=await Product.findById(req.query.id)
  
  res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


// delete review

exports.deleteReviews=catchAsyncError(async (req,res,next)=>{
    const product=await Product.findById(req.query.productId)

    // loop the entire array and store all expect passing id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });

    //update length after filter
    const numOfReviews=reviews.length

    // again finding average for filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //updating the final ratings noOfReviews and length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        numOfReviews,
        ratings
    })

  res.status(200).json({
        success: true,
    })
})
