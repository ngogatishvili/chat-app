

const errorHandler = async (err, req, res, next) => {
  let error={...err};
  error.message=err.message;

  return res.status(error.statusCode||500).json({success:false,msg:error.message||"Something went wrong"})
};

module.exports=errorHandler;