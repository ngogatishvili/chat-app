const User=require("../models/userModel");
const jwt=require('jsonwebtoken')
const ErrorResponse=require("../error/ErrorResponse")

const auth = async(req, res, next) => {
  try {
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")) {
        token=req.headers.authorization.split(" ")[1];
        
    }

    if(token) {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);
        if(!user) {
            return next(new ErrorResponse("Not authorized to access this route",400))
        }else{
            req.user=user;
            next();
        }
    }else{
       
        return next(new ErrorResponse("Not authorized to access this route",400))
    }
  } catch (err) {
  
    return next(new ErrorResponse("Not authorized to access this route",400))
  }
};

module.exports=auth;
