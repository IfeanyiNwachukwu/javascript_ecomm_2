const exp = require('constants');
const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminproductsRouter = require('./routes/admin/products');
const productsRouter =  require('./routes/products');
const cartsRouter = require('./routes/carts');


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));  //Global Middleware
app.use(cookieSession({keys:['hjdjwrjwrwrwwvhfsfnerte']}));
app.use(authRouter);
app.use(adminproductsRouter);
app.use(productsRouter);
app.use(cartsRouter);



app.listen(3009,()=>{
    console.log('Server is listening');
})


