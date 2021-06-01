const exp = require('constants');
const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const usersRepo = require('./repositories/users');

const app = express();

app.use(express.urlencoded({extended:true}));  //Global Middleware
app.use(cookieSession({keys:['hjdjwrjwrwrwwvhfsfnerte']}));
app.use(authRouter);



app.listen(3003,()=>{
    console.log('Server is listening');
})


