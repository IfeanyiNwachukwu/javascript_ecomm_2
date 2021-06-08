const exp = require('constants');
const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminproductsRouter = require('./routes/admin/products');
const productsRouter =  require('./routes/products');


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));  //Global Middleware
app.use(cookieSession({keys:['hjdjwrjwrwrwwvhfsfnerte']}));
app.use(authRouter);
app.use(adminproductsRouter);
app.use(productsRouter);



app.listen(3003,()=>{
    console.log('Server is listening');
})


