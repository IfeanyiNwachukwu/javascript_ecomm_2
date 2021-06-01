const express = require('express');
const router = express.Router();
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

router.get('/signup',(req,res) => {
    res.send(signupTemplate({req}));
})

router.post('/signup',async (req,res) => {   // to avoid copying and pasting this particular line of code everywhere we have a post request.
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

router.get('/signout', (req,res) => {
    req.session = null;
    res.send('You are logged out');
});

router.get('/signin', (req,res) => {
    res.send(signinTemplate());
});

router.post('/signin',async (req,res) => {
    const {email,password} = req.body;
    const user = await usersRepo.GetOneBy({email});
    if(!user){
        res.send('email does not exist');
        return;
    }
    const validPassword = await usersRepo.ComparePasswords(user.password,password);
    if(!validPassword){
        res.send('password is invalid');
        return;
    }
    
    req.session.userId = user.Id;
    res.send('You are signed In');
});

module.exports = router;

