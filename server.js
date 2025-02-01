const express =require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');


const cors =require('cors');
const authRoute = require('./routes/authRoute');
const categoryRoutes=require('./routes/CategoryRoutes')
const productRoutes=require('./routes/productRoutes');

dotenv.config();
//database config
connectDB();
// rest object
const app=express();

//middelware 
 app.use(cors());
 app.use(express.json());
 app.use(morgan("dev"));

// routes

app.use('/api/vi/auth',authRoute);
app.use('/api/vi/category',categoryRoutes);
app.use('/api/vi/product', productRoutes);

//rest api

app.get("/",(req,res)=>{
    res.send(
        "<h1>welcome to ecommerce app</h1>"
    );
});

//Port
const PORT=process.env.PORT|| 3000;

// run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE}  mode on http://localhost:${PORT}`)
})