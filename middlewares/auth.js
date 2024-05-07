const jwt=require('jsonwebtoken')

const varifyToken=(req,resp,next)=>{
    const token=req.body.token||req.headers['authorization']
   if(!token){
    return resp.status(401).json({message:"unauthorized"})
   }
   try {
    const bearer=token.split(' ');
    const bearerToken=bearer[1];
    const decoded=jwt.verify(bearerToken,process.env.ACCESS_TOKEN)
    req.user=decoded;



    
   } catch (error) {
    return resp.status(401).json({message:"invalid token"})
   }
   return next()
}

module.exports=varifyToken;
