// import { useEffect, useState } from "react"
// import { getProducts } from "/src/actions/productsActions"
// import {useDispatch, useSelector} from 'react-redux'
// import Loader from "../layouts/Loader"
// import Product from "../product/Product"
// import { toast} from "react-toastify"
// import { useParams } from "react-router-dom"

// function SearchByPriceSkip(){
// const {price}=useParams()
// // const [priceCondition,setPriceCondition]=useState([gt,gte,lt,lte])

// const dispatch=useDispatch()
// const {products,loading,error}=useSelector((state)=>state.productsState)

// useEffect(()=>{
  
//   if(error){
//   return toast.error("Error getting data",{
//      position: "bottom-center"
//   })
//   }
//   dispatch(getProducts(price))

// },[dispatch,error,price])

//     return<>
//     {loading?<Loader/>:
//     <><h1 id="products_heading">Search Products</h1>
//     <section id="products" className="container mt-5">
//       <div className="row">
//    {
//     products && products.map(product=>(
//       <Product key={product._id} product={product}/>
//     ))
//    }       
//       </div>
//       </section>
//     <div>1</div>
//     <div>1</div>
//     <div>1</div>

//       </>
//       }
//       </>

      

      
// }
// export default SearchByPriceSkip
