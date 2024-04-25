const Accounts = require("../model/account")
const utils = {};

utils.generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
 
utils.currentTime = ()=>{
   return  new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata'
      });  
} 

utils.expiredTime = ()=>{
    const futureTime = new Date(Date.now() + 60000); // Current time plus one minute
     return futureTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
}
 
utils.userId = () => {
    return Math.floor(100000 + Math.random() * 10000);
};
 
utils.employeeId = () => {
    return Math.floor(1000 + Math.random(8) * 16);
};

utils.findAccount = async(userId, )=>{
    const findAccount = await Accounts.findOne({  
        where: {
           userId,
           emailVerified : true,
           login:true,
           isDeleted: false
       } });
       return (findAccount)
}
module.exports =  utils;