const {check,validationResult} = require('express-validator');
const usersRepo = require('../../repositories/users');


module.exports = {
    requireEmail : check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid Email')
    .custom(async (email) => {
        const existingUser = await usersRepo.GetOneBy({email});
        if(existingUser){
           throw new Error('Email is in use already')
        }
    }),
    requirePassword : check('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('passord must be between 4 and 20 characters long'),
    
    requirePasswordConfirmation : check('passwordConfirmation')
    .trim()
    .isLength({min:4,max:20})
    .custom((passwordConfirmation,{req}) => {
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