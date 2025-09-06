require('dotenv').config();//to use .env file
const cors  =require('cors');//to allow cross origin resource sharing
const express = require('express');
const app = express();
app.use(express.json());//to parse json data
app.use(cors());//to allow cross origin resource sharing

// //import routes
const userRouter = require('./routers/userRouters');
const productRouter = require('./routers/productRouters');
const contactRouter = require('./routers/contactRouters');
const transactionRouter = require('./routers/transactionRouters');
const reportRouter = require('./routers/reportRouters');



// //api routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/transaction', transactionRouter);
app.use('/api/v1/report', reportRouter);



//import db funtion
const connectDB =require('./database/db');
connectDB();//dtabase connection
app.get('/', (req, res) => {
    return res.send('Api is running....')
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Server is running at port ' + `${port}`);
})