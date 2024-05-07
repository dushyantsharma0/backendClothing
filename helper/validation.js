 const {check}=require('express-validator')

 exports.registerValidator = [
     check('name').notEmpty().withMessage('Name is required'),
     check('email').isEmail().withMessage('Email is required').normalizeEmail({
        gmail_remove_dots: true
     }),
     check('password').notEmpty().withMessage('Password is required'),
     check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
     check('password').matches(/\d/).withMessage('Password must contain a number'),
     check('password').matches(/[a-zA-Z]/).withMessage('Password must contain a letter')
 ]
 
 exports.loginValidator = [
     check('email').isEmail().withMessage('Email is required').normalizeEmail({
        gmail_remove_dots: true
     }),
     check('password').notEmpty().withMessage('Password is required'),
     
    
    ]
     
     exports.forgetPassvalidater=[
         check('email').isEmail().withMessage('Email is required').normalizeEmail({
            gmail_remove_dots: true
         })
     ]
     exports.updatepasswordValidator=[
         check('password').notEmpty().withMessage('Password is required'),
         check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
         check('password').matches(/\d/).withMessage('Password must contain a number'),
         check('password').matches(/[a-zA-Z]/).withMessage('Password must contain a letter')
     ]