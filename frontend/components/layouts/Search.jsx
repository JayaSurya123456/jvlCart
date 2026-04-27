import { useEffect, useState } from "react"
import {useLocation, useNavigate} from 'react-router-dom'
function Search(){
const navigate = useNavigate()
const location =useLocation()

   const [keyword,setKeyword]=useState("")
   const searchHandler=(e)=>{
    //prevent page refresh when submit form
    e.preventDefault()
    navigate(`/search/${keyword}`)
   }

   const clearKeyword=()=>{
    if(location.pathname==='/')
    setKeyword("")
   }
   
   console.log(location.pathname)
   useEffect(()=>{
    clearKeyword()
   },[location])

    return <>
       <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
          onChange={(e)=>{setKeyword(e.target.value)}}
          value={keyword}
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>

        </div>
            </form>

    </>
}
export default Search