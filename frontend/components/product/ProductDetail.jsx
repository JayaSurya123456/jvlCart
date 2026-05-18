import { useEffect, useState } from "react"
import { getProduct } from "../../src/actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Loader from "../layouts/Loader"
import { addCartitems } from "../../src/actions/cartActions"

function ProductDetail(){
    const dispatch =useDispatch()
    const {id}=useParams()
    const {product,loading,error}=useSelector((state)=>state.productState)
    useEffect(()=>{
        dispatch(getProduct(id))
    },[])

const [quantity,setQuantity]=useState(1)

const increaseQty = ()=>{
const count=document.querySelector('.count')
if(product.stock ===0 || count.valueAsNumber >=product.stock) return
const qty= count.valueAsNumber+1
setQuantity(qty)
}

const decreseQty=()=>{
const count =document.querySelector('.count')
if(count.valueAsNumber===1) return
const qty= count.valueAsNumber-1
setQuantity(qty)
}


return <>

{loading ? <Loader/>:
<div className="container container-fluid">
<div className="row f-flex justify-content-around">
<div className="col-12 col-lg-5 img-fluid" id="product_image">
{product.images && product.images.map((image)=>
<img src={image.image}/>
)}
</div>
<div className="col-12 col-lg-5 mt-5">
<h3>{product.name}</h3>
<p id="product_id">Product # {product._id}</p>

<hr/>

<div className="rating-outer">
<div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}>
</div>
</div>
<span id="no_of_reviews">({product.numOfReviews}) Reviews</span>
<hr/>

<p id="product_price">${product.price}</p>
<div className="stockCounter d-inline">
<span onClick={decreseQty} className="btn btn-danger minus">-</span>

<input type="number" className="form-control count d-inline" value={quantity} readOnly />

<span onClick={increaseQty} className="btn btn-primary plus">+</span>
</div>
<button 
onClick={()=>dispatch(addCartitems(product._id,quantity))}
 disabled={product.stock==0?true:false} 
type="button" id="cart_btn" 
className="btn btn-primary d-inline ml-4">Add to Cart</button>

<hr/>

<p>Status: <span id="stock_status"className={product.stock>0?"greenColor":"redColor"}>{product.stock>0?"stock":"outofStock" }</span></p>

<hr/>

<h4 className="mt-2">Description:</h4>
<p>{product.description}</p>
<hr/>
<p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

<div className="rating w-50"></div>

</div>

</div>

</div>    
}

</>
}    



export default ProductDetail