import { useEffect } from "react"
import { getProducts } from "../src/actions/productsActions"
import {useDispatch, useSelector} from 'react-redux'
import Loader from "./layouts/Loader"
import Product from "./product/Product"
import { toast} from "react-toastify"
import { Link } from "react-router-dom"

function Home(){
  const dispatch=useDispatch()

const {products,loading,error}=useSelector((state)=>state.productsState)

useEffect(()=>{
  
  if(error){
  return toast.error("Error getting data",{
     position: "bottom-center"
  })
  }
  dispatch(getProducts(null,null,null))
},[dispatch,error])

    return<>
    
    {loading?<Loader/>:
    <><h1 id="products_heading">Latest Products</h1>
    <section id="products" className="container mt-5">
      <div className="row">
   {
    products && products.map(product=>(
      <Product col={3} key={product._id} product={product}/>
    ))
   }       
      </div>
      </section>

      {/* <div className="d-flex justify-content-center mt-5">
        <ReactPaginate/> // skipped 
      </div> */}
      </>
      }

      </>

      

      
}
export default Home
