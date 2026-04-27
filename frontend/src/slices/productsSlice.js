import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:'products',
    initialState:{
        loading:false
    },
    reducers:{
        productsRequest(state,action){
            return{
                //loading true mean loading spinner showing
                loading:true
            }
        },
        productsSuccess(state,action){
            return{
                loading:false,
                products:action.payload.products
            }
        },
        productsFail(state,action){
            return{
                loading:false,
                error:action.payload
            }
        }
    }
})

const {actions,reducer}=productSlice

export const {productsFail,productsRequest,productsSuccess}=actions

export default reducer