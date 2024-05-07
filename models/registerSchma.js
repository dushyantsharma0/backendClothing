const mongoose = require('mongoose');
 const registerSchma=mongoose.Schema({
   
     name:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     password:{
         type:String,
         required:true
     },
     otp:{
         type:String,
         
     },
     totalNumber: {
        type: Number,
        // Set the expiry time to 1 minute
    }
     

 }, 
 {
     timestamps:true
 }

)
 module.exports=mongoose.model('Register',registerSchma);