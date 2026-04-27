const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const path=require('path')
app.set("query parser", "extended");

const errorMiddleware=require('./middlewares/error')
app.use(express.json())
app.use(cookieParser())

//change to static file uploads
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

const products=require('./routes/product')
const auth=require('./routes/auth')
const order=require('./routes/order')


app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)



app.use(errorMiddleware)

module.exports=app
