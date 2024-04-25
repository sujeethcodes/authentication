const Accounts = require("../model/account")
const Profile = require("../model/profile")
const Otp = require("../model/otp")
const response = require("../utils/res")
const utils = require("../utils/helper")
const tokenManagement = require("../utils/tokenManagement")
const bcrypt = require("bcrypt")
const sendEmail = require("../lib/nodemailer")

const controller = {}

// create account 
controller.createAccount = async(req, res)=>{
try {
const obj = {...req?.body}
obj.createdAt = utils.currentTime()
obj.expiredAt = utils.expiredTime()
obj.userId = utils.userId()
obj.otp = utils.generateOtp()
obj.employeeId = utils.employeeId()
obj.password =  bcrypt.hashSync(req?.body?.password, 10);

const findAccount = await Accounts.findOne({  
     where: {
        emailId: obj.emailId
    } });

    if(findAccount?.emailVerified === false) {
        await sendEmail(obj.emailId, obj.otp)
        const otpUpdate = await Otp.update({otp:obj.otp, createdAt: obj.createdAt, expiredAt:obj.expiredAt}, {where:{emailId:findAccount?.emailId}})
        if(otpUpdate){
            return res.status(response.successStatus).json({status:response.successStatus, message:response.otpReSend})
        } else{
            return res.status(response.failedStatus).json({status:response.failedStatus, message:response.otpReSendFailed})
        }
    }
    if (findAccount?.emailVerified === true) return res.status(response.failedStatus).json({status:response.failedStatus, message: response.haveAccount });
   
   const createAccount = await Accounts.create(obj)
   if(createAccount){
    await sendEmail(obj.emailId, obj.otp)
    if(!sendEmail) return res.json("otp triger failed")
    const otpCreate = await Otp.create(obj)
    if(!otpCreate) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.createOtpFailed})
    const token = await tokenManagement.tokenGenerate(obj.userId)
    if(!token) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.tokenFailed}) 
    const createProfile = await Profile.create(obj)
    if(!createProfile) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.createProfileFailed})
    return res.status(response.successStatus).json({status:response.success, message:response.createAccountSuccess, token , verifyOptUrl : "http://localhost:9000/v1/api/accounts/verifyOtp"})
   }else{
    return res.status(response.failedStatus).json({status:response.failed, message:response.createAccountFailed})
   }

} catch (e) {
    return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
}
}

// verify otp

controller.verifyOtp = async(req, res)=>{
    try {
        const currentTime = utils.currentTime()
        const verifyAccount = await Accounts.findOne({where:{
            emailId:req?.body?.emailId,
            emailVerified:false
        }})
       if(!verifyAccount) return res.status(response.failedStatus).json({status:response.failedStatus ,message:response.haveAccount})
        const verifyOtp = await Otp.findOne({
            where:{
                emailId:verifyAccount?.emailId,
                otp:req?.body?.otp
            }
           
        })
        // console.log(currentTime , verifyOtp?.expiredAt)
        if(currentTime < verifyOtp?.expiredAt){
            const verifiedEmail = await Accounts.update({emailVerified:true}, {where:{emailId : verifyAccount?.emailId}})
            if(verifiedEmail) {
                return res.status(response.successStatus).json({status:response.successStatus, message:response.otpSuccess})
            }else{
                return res.status(response.failedStatus).json({status:response.failedStatus, message:response.otpFailed})
            }
        } else{
            return res.status.response.failedStatus.json({status:response.failedStatus, message:response.otpTimeOut})
        }
        
    } catch (e) {
        return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
    }
    
}


// login account 

controller.loginAccount = async(req, res)=>{
    try {
       const findAccount = await Accounts.findOne({
        where: {emailId:req?.body?.emailId, userId:req?.user?.userId}
       })
      if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
       const validPassword = bcrypt.compareSync(req?.body?.password, findAccount.password);
       if(!validPassword) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildPassword})
       if(findAccount){
        const loginUpdate = await findAccount.update({login : true})
        if(!loginUpdate) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.loginFailed})
        if(loginUpdate){
            const token = await tokenManagement.tokenGenerate(req?.user?.userId)
            if(!token) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.tokenFailed}) 
            return res.status(response.successStatus).json({status:response.successStatus, message:response.loginSuccess, token})

        }
       }else{
        return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
    }
    } catch (e) {
        return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})  
    }
   
}

controller.logOutAccount = async(req, res)=>{
    try {
        const findAccount = await Accounts.findOne({
            where: {userId:req?.user?.userId}
           })
           if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
           if(findAccount){
            const loginUpdate = await findAccount.update({login : false})
            if(!loginUpdate) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.loginFailed})

            const logOutUpdate = await findAccount.update({logOut : true})
            if(!logOutUpdate) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.logOutFailed})
            if(logOutUpdate)
                return res.status(response.successStatus).json({status:response.successStatus, message:response.logOutSuccess})
           }else{
            return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
        }
    } catch (e) {
        return res.status(response.errorStatus).json({status:response.errorStatus, message:e.message})
    }
}



controller.accountDelete = async(req, res)=>{

    const findAccount = await Accounts.findOne({
        where: {emailVerified:true, emailId:req?.body?.emailId, login:true}
       })
       
       if(!findAccount) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildAccount})
       const validPassword = bcrypt.compareSync(req?.body?.password, findAccount?.password);
       if(!validPassword) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.invaildPassword})
       const accountDelete = await Accounts.update({isDeleted:true}, {where:{emailId:findAccount?.emailId}})
    if(accountDelete){
        const profileDelete = await Profile.update({isDeleted:true}, {where:{userId:findAccount?.userId}})
        if(!profileDelete) return res.status(response.failedStatus).json({status:response.failedStatus, message:response.profileDeleteFailed})
        return res.status(response.successStatus).json({status:response.successStatus, message:response.accountDeleteSuccess})
    }else{
        return res.status(response.failedStatus).json({status:response.failedStatus, message:response.accountDeleteFailed})

    }

}
module.exports = controller
