import axios from 'axios'
import {productsFail,productsRequest, productsSuccess } from '../slices/productsSlice'



export const getProducts=(keyword,price,category,rating)=>async(dispatch)=>{

    try {
        //step 1 making loading true 
        //simply call all reducer function
        dispatch(productsRequest())

        let link =`/api/v1/products?`
        if (keyword){
            link+=`keyword=${keyword}`
        }
        if(price){
            link+=`&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category){
            link+=`&category=${category}`
        }
        if(rating){
            link+=`&ratings=${rating}`

        }
        const {data}=await axios.get(link) 

        // const {data}=await axios.get(`/api/v1/products`)  


        //step 2 calling product success payload
        //send axios data to productsSuccess(action)
        //we can access action.payload.product what we are doing just dispatch 
        dispatch(productsSuccess(data))

    } catch (error) {
        //send error to payload 
        dispatch(productsFail(error.response.data.message))
    }
}