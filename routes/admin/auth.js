const express = require('express');
const router = express.Router();
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation,requireEmailExists,requireValidPasswordForUser } = require('./validators');
const {check,validationResult} = require('express-validator');

router.get('/signup',(req,res) => {
    res.send(signupTemplate({req}));
})

router.post('/signup',[requireEmail,requirePassword,requirePasswordConfirmation],async (req,res) => {   // to avoid copying and pasting this particular line of code everywhere we have a post request.
    //req.on is similar to an addEventListener but this time it is listening for a data object

    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        res.send(signupTemplate({req,errors}));
        return;
    }
    
    const {email,password,passwordConfirmation} = req.body;
    
    
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
    res.send(signinTemplate({}));
});

router.post('/signin',[requireEmailExists,requireValidPasswordForUser]
   
,async (req,res) => {

    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        res.send(signinTemplate({errors}))
    }
    
    const {email,password} = req.body;
    const user = await usersRepo.GetOneBy({email});

    if(user){
        req.session.userId = user.Id;
        res.send('You are signed In');
    }
   
   
    
  
});

module.exports = router;

