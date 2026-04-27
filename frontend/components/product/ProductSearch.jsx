import { useEffect, useState } from "react"
import { getProducts } from "/src/actions/productsActions"
import {useDispatch, useSelector} from 'react-redux'
import Loader from "../layouts/Loader"
import Product from "../product/Product"
import { toast} from "react-toastify"
import { useParams } from "react-router-dom"
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { useNavigate } from "react-router-dom";


function ProductSearch(){
    const dispatch = useDispatch();
    const {products, loading, error} =    useSelector((state) => state.productsState)
    const [price, setPrice] = useState([1,1000]);
    const [priceChanged, setPriceChanged] = useState(price);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);

    const { keyword } = useParams();
    const navigate = useNavigate();

    const categories = [  
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ];
 

  useEffect(()=>{
  if(error){
  return toast.error("Error getting data",{
     position: "bottom-center"
  })
  }


dispatch(getProducts(keyword, priceChanged, category,rating))

},[dispatch,error,keyword,priceChanged,category,rating])



return (
    <>
        {loading ? <Loader/>:
    <>
<h1 id="products_heading">Search Products</h1>
<section id="products" className="container mt-5">
<div className="row">
<div className="col-6 col-md-3 mb-5 mt-5">
{/* Price Filter */}
<div className="px-5" onMouseUp={()=>setPriceChanged(price)}>
<Slider
range={true}
marks = {
        {
        1: "$1",
        1000: "$1000"
        }   
}
min={1}
max={1000}
defaultValue={price}
onChange={(price)=>{
    setPrice(price)
}}
handleRender={
renderProps => {
return (
    <Tooltip  overlay={`$${renderProps.props['aria-valuenow']}`}  >
            <div {...renderProps.props}>  </div>
    </Tooltip>
)
}
}
/>
</div>

<hr className="my-5" />        
{/* Category Filter */}
<div className="mt-5">
<h3 className="mb-3">Categories</h3> 
<ul className="pl-0">
{categories.map(category =>
        <li
        style={{
            cursor:"pointer",
            listStyleType: "none"
        }}
        key={category}
        onClick={()=>{
        setCategory(category)
            navigate("/products")  
        }}
        >
            {category}
        </li>
    )}
    
</ul>
</div>






<hr className="my-5" /> 
{/* Ratings Filter */}
<div className="mt-5">
<h4 className="mb-3">Ratings</h4>
<ul className="pl-0">
{[5, 4, 3, 2, 1].map(star =>
        <li
        style={{
            cursor:"pointer",
            listStyleType: "none"
        }}
        key={star}
        onClick={()=>{
        setRating(star)
        }}
        >
        <div className="rating-outer">
            <div 
            className="rating-inner"
            style={{
                width: `${star * 20}%`
            }}
            > 

            </div>
        </div>
        </li>
    
    )}
    
</ul>
</div>
</div>
<div className="col-6 col-md-9">
    <div className="row">
        { products && products.map(product => (
            <Product col={4} key={product._id}  product={product}/>
        ))}
    </div>

    </div>
</div>
</section>

</>
}
</>
)
}

export default ProductSearch
