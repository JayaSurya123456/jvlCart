import './App.css'
import Header from "../components/layouts/Header"
import Footer from '../components/layouts/Footer'
import Home from '../components/Home'
import {BrowserRouter as Router ,Route, Routes } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import ProductDetail from '../components/product/ProductDetail'
import ProductSearch from '../components/product/ProductSearch'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import { useEffect } from 'react'
import store from './store'
import { loadUser } from './actions/userActions'


function App(){
  useEffect(()=>{
  store.dispatch(loadUser)
},[loadUser])

  return <>
   <Router>
    <Header/>
    <div className='container container-fluid'>
    <ToastContainer theme='dark'/>
       <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/search/:keyword' element={<ProductSearch/>}/>
      <Route path='/product/:id' element={<ProductDetail/>}/>
      <Route path='/products' element={<ProductSearch />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />


    </Routes>
    <Footer/>
    </div>
  </Router> 
  </>
}

export default App