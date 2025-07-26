const jwt =require("jsonwebtoken")
const User =require("../models/user")

const protect = async(req,res,next)=>{
    try{
    const {token} = req.body;

    if(token && token.startsWith("Bearer")){
        token=token.split(" ")[1];
        const decode = jwt.verify(token,process.env.JWt_SECRETS);
        req.user = await User.findById(decode._id);
         next()
    }

    else {
        res.status(403).json({message:"Login first"})
    }
   }
   catch(err){
     res.status(500).json({message:"token falied"})
   }
}

module.exports = {protect}; 