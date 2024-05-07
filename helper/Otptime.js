const  session = require('express-session')
const CheckOtpExpire=(ExpiryDate,req)=>{
    try {
        const nowData=new Date();
        const differenceInTime=nowData.getTime()-ExpiryDate
        const differenceInminut=Math.floor(differenceInTime/(1000*60))
        console.log(differenceInminut)
        req.session.data = 61 - differenceInminut;
        if(differenceInminut>60){
            return true
        }else{
            return false
        }


        
    } catch (error) {
         console.log(error)
    }
}

module.exports={
    CheckOtpExpire
}