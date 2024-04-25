const utils = require("../utils/helper")
const structureUtils = require("../utils/structure")
const response = require("../utils/res")
const Profile = require("../model/profile")
const Accounts = require("../model/account")
const controller = {}
controller.editProfile = async(req, res)=>{
   try {
     const findAccount = await utils.findAccount(req?.body?.userId)
     if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
      const profileUpdate = await Profile.update({...req?.body}, {where:{userId:findAccount?.userId}})
    if(profileUpdate){
      return  res.status(response.successStatus).json({status:response.successStatus, message:response.profileUpdateSuccess})
    }else{
        return  res.status(response.failedStatus).json({status:response.failedStatus, message:response.profileUpdateFailed})
    }
   } catch (e) {
    return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
   }
}

controller.getUserDetails = async(req, res)=>{
    try {
        const findAccount = await Accounts.findOne({
            where: {
               userId:req?.query?.userId,
               emailVerified : true,
               login:true,
               isDeleted: false
           },
           include:{
            model:Profile,
            required:true,
           }
         });
        if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
        return res.json(structureUtils.AccountStructure(findAccount))
        
    } catch (e) {
        return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
    }
    
}

controller.getAllUserDetails = async(req, res)=>{
  try {
    const findAccount = await Accounts.findAll({
        where: {
           emailVerified : true,
           isDeleted: false
       },
       limit:req?.body?.limit ?? 20,
       offset:req?.body?.skip ?? 0,
       include:{
        model:Profile,
        required:true,
       }
     });
    if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
    return res.json(findAccount.map((each)=>structureUtils.AccountStructure(each)))
    
} catch (e) {
    return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
}
}
module.exports = controller