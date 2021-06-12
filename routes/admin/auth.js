const express = require('express');
const router = express.Router();
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation,requireEmailExists,requireValidPasswordForUser } = require('./validators');
const {handleErrors} = require('./middlewares');

router.get('/signup',(req,res) => {
    res.send(signupTemplate({req}));
})

router.post('/signup',[requireEmail,requirePassword,requirePasswordConfirmation],handleErrors(signupTemplate), async (req,res) => {   // to avoid copying and pasting this particular line of code everywhere we have a post request.
    //req.on is similar to an addEventListener but this time it is listening for a data object
    const {email,password,passwordConfirmation} = req.body;
    // Create a user in our user repo to represent this person
    const user = await usersRepo.Create({email,password});
   // Store the id of that user inside the users cookie
    req.session.userId = user.Id;
   
    res.redirect('/admin/products');
});

router.get('/signout', (req,res) => {
    req.session = null;
    res.send('You are logged out');
});

router.get('/signin', (req,res) => {
    res.send(signinTemplate({}));
});

router.post('/signin',[requireEmailExists,requireValidPasswordForUser],
handleErrors(signinTemplate),
async (req,res) => {

    const {email,password} = req.body;
    const user = await usersRepo.GetOneBy({email});
    req.session.userId = user.Id;
    res.redirect('/admin/products');
    
});

module.exports = router;

