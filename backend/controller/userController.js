const sendMail = require("../Middleware/sendemail");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
try{
    const {name,email} = req.body;
    
    const userExist = await User.findOne({ email });
    if(userExist){
      return res.status(400).json({message:"User already exist !"})
    }

    const user = await User.create({
        name,
        email,
    })

    const otp = Math.floor(Math.random() * 1000000);

    const verifyToken = jwt.sign({ user, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    
    await sendMail(email, "ChatBot", otp);

    res.json({
      message: "Otp sent to your mail",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const VerifyUser = async(req,res)=>{
  
    try{
    const {otp,verifyToken} = req.body;
    
    const isVerify = jwt.verify(verifyToken,process.env.JWT_SECRET)
    
    if(!isVerify){
        return res.status(400).json({message:"OTP expired"})
    }
   
    if(otp!=isVerify.otp){
        return res.status(400).json({message:"Wrong OTP"})
    }

    const token = jwt.sign({_id:isVerify.user._id},process.env.JWT_SECRETS,{
        expiresIn:"5d",
    })
    
    
    res.json({
        message:"Logged in Successfully",
        user: isVerify.user,
        token,
    })
   } catch(error){
      res.status(500).json({
      message: error.message,
    });
   }

}

 const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {register,VerifyUser,myProfile};