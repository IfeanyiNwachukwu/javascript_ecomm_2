const exp = require('constants');
const express = require('express');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(express.urlencoded({extended:true}));  //Global Middleware
app.use(cookieSession({keys:['hjdjwrjwrwrwwvhfsfnerte']}));
const UsersRepo = require('./repositories/users')

app.get('/signup',(req,res) => {
    res.send(` <div>
    
    <form action="" method="POST">
        <input  type="email" name="email" id="" placeholder="email">
        <input type="password" name="password" id="" placeholder="password">
        <input type="password" name="passwordConfirmation" id="" placeholder="Confirm password">
        <button>Register</button>
    </form>
</div>`);
})

app.post('/signup',async (req,res) => {   // to avoid copying and pasting this particular line of code everywhere we have a post request.
    //req.on is similar to an addEventListener but this time it is listening for a data object
    console.log(req.body);
    const {email,password,passwordConfirmation} = req.body;
    const existingUser = await usersRepo.GetOneBy({email});
    if(existingUser){
        res.send('Email in use');
        return;
    }
    if(password !== passwordConfirmation){
         res.send('passwords must match');
         return;
    }
    // Create a user in our user repo to represent this person
    const user = await usersRepo.Create({email,password});

    // Store the id of that user inside the users cookie
    req.session.userId = user.Id;
    res.send('Account created!!!');
});

app.get('/signout', (req,res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req,res) => {
    res.send(`
    <div>
        <form action="" method="POST">
            <input  type="email" name="email" id="" placeholder="email">
            <input type="password" name="password" id="" placeholder="password">
            <button>Sign In</button>
        </form>
    </div>
    `)
});

app.post('/signin',async (req,res) => {
    const {email,password} = req.body;
    const user = await usersRepo.GetOneBy({email});
    if(!user){
        res.send('email does not exist');
        return;
    }
    if(password !== user.password){
        res.send('Invalid password');
    }
    
    req.session.userId = user.Id;
    res.send('You are signed In');
})



app.listen(3003,()=>{
    console.log('Server is listening');
})


