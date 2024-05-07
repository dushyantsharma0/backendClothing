const express = require('express')
const UserComtroller=require('../controller/userController')


const Router = express.Router()
const auth=require('../middlewares/auth')

 const {registerValidator,loginValidator,forgetPassvalidater,updatepasswordValidator}=require('../helper/validation')
 Router.route('/register').post(registerValidator,UserComtroller.Register)
 Router.route('/login').post(loginValidator,UserComtroller.login)
 Router.route('/forgetPass').post(forgetPassvalidater,UserComtroller.forgetPass)
 Router.route('/otpcheck').post(UserComtroller.otpCheck)
 Router.route('/updatepassword').post(updatepasswordValidator,UserComtroller.updatePassword)
 Router.route('/test').get(auth,UserComtroller.test)



 module.exports = Router;

