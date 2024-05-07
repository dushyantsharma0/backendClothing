 const reqisterSchma=require('../models/registerSchma')
 const Mailer=require('../helper/mailer')
 const otpGenerator = require('otp-generator')
 const {CheckOtpExpire}=require('../helper/Otptime')
 const {validationResult}=require('express-validator')
 const jwt=require('jsonwebtoken')


 const generateAccessToken =async(user)=>{
     const token=jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'2h'})
     return token
    
 }

 const   Register= async(req,resp)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return resp.status(400).json({errors:errors.array()})
    }
   
    const registation= new reqisterSchma({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password})
       const data= await registation.save()
        resp.status(200).json({data:data})
       
   try {
    
   } catch (error) {
     resp.status(500).send(error.message)
   }

    
    }


    const login = async (req, resp) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return resp.status(400).json({errors:errors.array()})
        }

        const email = req.body.email;
        const password = req.body.password;
        try {
            const data = await reqisterSchma.findOne({ email: email, password: password });
           if (data) {
            const accessToken=await generateAccessToken({user:data})
            resp.status(200).json({
                message:'login success',
                
               success:true,
               data:data,
               accessToken:accessToken,
               tokenType:'Bearer'
               

            })
            
            
           }else{
            resp.status(404).json({ message: "invalid email or password" });
           }
        } catch (err) {
            resp.status(500).send(err.message);
        }
    }
    const forgetPass= async(req,resp)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return resp.status(400).json({errors:errors.array()})
        }
        const otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });

        const email=req.body.email;
        try {
            const data=await reqisterSchma.findOne({email:email})
            if(data){
             
              

              if(data.totalNumber<4){
                data.otp=otp
                await data.save()
                const msg=`<h1>your Otp is ${otp}</h1>`
                Mailer.sendMail(email,'BX-OTP',msg)
                resp.status(200).json({data:'otp send success'})
               

                 
              }else{
                const isotpExpire= await CheckOtpExpire(data.updatedAt,req)
                if(isotpExpire){
                   data.totalNumber=0
                   await data.save()
                   resp.status(404).json({message:" now click to send btn for send otp"})
                }else{
                  if(req.session.data){
                    resp.status(404).json({message:`wait for ${req.session.data} minuts `,})
                  }else{
                    resp.status(404).json({message:"wait for 1 hour"})
                  }
                   
                }
              }


                
            }else{

                resp.status(404).json({message:"invalid email"})
            }
        } catch (error) {
            resp.status(500).send(error.message)
        }

    }

    const otpCheck= async(req,resp)=>{
        const otp=req.body.otp;
        const email=req.body.email;
        try {
            const data= await reqisterSchma.findOne({email:email,otp:otp})
            const data2= await reqisterSchma.findOne({email:email})
            if(data){
                resp.status(200).json({data:data})
            }else{
                if(data2.totalNumber==0){
                    const update= await  reqisterSchma.updateOne({email:email},{$inc:{totalNumber:1}})

                    console.log('you have 4 chance for open')
                    resp.status(404).json({message:"you have 4 chance for open"})
                }
                 if(data2.totalNumber==1){
                    const update= await  reqisterSchma.updateOne({email:email},{$inc:{totalNumber:1}})

                    console.log('you have 3 chance for open')
                    resp.status(404).json({message:"you have 3 chance for open"})
                }
                if(data2.totalNumber==2){
                    const update= await  reqisterSchma.updateOne({email:email},{$inc:{totalNumber:1}})

                       console.log('you have 2 chance for open')
                       resp.status(404).json({message:"you have 2 chance for open"})
                       
                }if(data2.totalNumber==3){
                    const update= await  reqisterSchma.updateOne({email:email},{$inc:{totalNumber:1}})

                    console.log('you have 1 chance for open')
                    resp.status(404).json({message:"you have 1 chance for open"})
                }if(data2.totalNumber>=4){
                    
                    resp.status(404).json({message:`wait for ${req.session.data} minuts `,})
                }
            }
        } catch (error) {
            resp.status(500).send(error.message)
        }
    }

    const updatePassword=async (req, res) => {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const email = req.body.email;
        const password = req.body.password;
        try {
            const data = await reqisterSchma.updateOne({email}, { $set: { password }});
            res.status(200).json({ data: data });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    const test=(req,resp)=>{
        resp.status(200).json({message:'test',data:req.user})
    }
  module.exports ={
    Register,
    login,
     forgetPass,
     otpCheck,
     updatePassword,
     test

  
  }