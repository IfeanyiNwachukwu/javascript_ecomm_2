const {check,validationResult} = require('express-validator');
const usersRepo = require('../../repositories/users');

usersRepo.GetOneBy


module.exports = {
    requireTitle  : check('title')
    .trim()
    .isLength({min:5,max:40})
    .withMessage('Must be characters within 5 to 40 letter`s'),
    requirePrice : check('price')
    .trim()
    .toFloat()
    .isFloat({min:1})
    .withMessage('Must be a number with a minimum value of 1'),
    requireEmail : check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email')
    .custom(async(email) => {
        const existingUser = await usersRepo.GetOneBy({email});
        if(existingUser){
            throw new Error('Email is already in use');
        }
    }),
    requirePassword : check('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('passord must be between 4 and 20 characters long'),
    
    requirePasswordConfirmation : check('passwordConfirmation')
    .trim()
    .isLength({min:4,max:20})
    .custom(async(passwordConfirmation,{req}) => {
        console.log(req.body.password);
        console.log(passwordConfirmation);
        if(passwordConfirmation !== req.body.password){
            throw new Error('password and password confirmation must match')
       }
    }),

    requireEmailExists :  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is not valid')
    .custom(async(email) => {
        const user = await usersRepo.GetOneBy({email});
       if(!user){
        throw new Error('user with this email does not exist')
        }
    }),

    requireValidPasswordForUser :  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is not valid')
    .custom(async(email) => {
        const user = await usersRepo.GetOneBy({email});
       if(!user){
        throw new Error('user with this email does not exist')
        }
    }),
}