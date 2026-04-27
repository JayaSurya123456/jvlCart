import axios from 'axios'
import {productFail,productRequest, productSuccess } from '../slices/productSlice'

export const getProduct =id => async(dispatch)=>{

    try {
        //step 1 making loading true 
        //simply call all reducer function
        dispatch(productRequest())
        const{data}=await axios.get(`/api/v1/product/${id}`)  

        //step 2 calling product success payload
        //send axios data to productsSuccess(action)
        //we can access action.payload.product what we are doing just dispatch 
        dispatch(productSuccess(data))

    } catch (error) {
        //send error to payload 
        dispatch(productFail(error.response.data.message))
    }
}