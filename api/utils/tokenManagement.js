const jwt = require("jsonwebtoken")
const response = require("../utils/res")
const Account = require("../model/account")
const tokenManagement = {}

tokenManagement.tokenGenerate = async(userId)=>{
   return jwt.sign({ userId: userId},process.env.JWT_SECRET);
} 


 tokenManagement.verifyUser = async(req,res,next)=>{
  if(!req.headers['authorization']) return res.json({status:response.failedStatus, message:response.tokenRequired})
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) return res.json({status:response.failedStatus, message:response.invaildToken});
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
  if(!decoded) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildToken})
    const findUser = await Account.findOne({ where:{userId : decoded?.userId}})
    if(!findUser) return res.json({status:response.failedStatus, message:response.invaildUser})
    if(findUser){
      req.user = findUser
      next()
    }

  }
   
   
  tokenManagement.verifyAdmin = async(req, res, next) => {
    if(!req.headers['authorization']) return res.json({status:response.failedStatus, message:response.tokenRequired})
    const token = req.headers['authorization'].split(" ")[1];
    if (!token) return res.json(401, "invaild token");
    const decoded = jwt.decode(token, process.env.JWT_SECRET)
    if(!decoded) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildToken})
    const findUser = await Account.findOne({where:{userId : decoded?.userId, isAdmin : true}})
    if(!findUser) return res.json({status:response.failedStatus, message:response.invaildAdmin})
    if(findUser){
      req.user = findUser
      next()
    }
  }

  module.exports = tokenManagement