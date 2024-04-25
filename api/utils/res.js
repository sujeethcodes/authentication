const res = {}
res.createAccountSuccess = "please enter your otp",
res.createAccountFailed = "Account Creation Failed",
res.haveAccount = "Alredy you have a account in this emailId"
res.createProfileFailed = "create profile faield"
res.createOtpFailed = "create otp failed"
res.emailFalse = "please verify your email id"
res.loginSuccess = "Account login SuccessFully"
res.loginFailed = "Account logout Failed"
res.logOutSuccess = "Account logout SuccessFully"
res.logOutFailed = "Account login Failed"
res.invaildAccount = "Invaild Account"
res.invaildPassword = "your password has been incorrect"
res.profileUpdateSuccess = "profile update successfully"
res.profileUpdateFailed = "profile update failed"
res.profileDeleteFailed = "profile delete failed"
res.invaildToken = "token has been invaild"
res.otpSuccess = "your account has been created"
res.otpReSend = "otp resend successfully"
res.otpReSendFailed= "otp resend failed"
res.otpFailed = "please check you otp"
res.otpTimeOut = "otp has been expired"
res.accountDeleteSuccess = "your account has been deleted successfully"
res.accountDeleteFailed = "your account has been deleted Failed"
res.emailOtpTextContent = "To verify your email address, please use the following One Time Password (OTP)  Do not share this OTP with anyone"
res.emailOtpSubject = "Verify Otp"
res.tokenRequired = "token required"
res.invaildUser = "invaild user",
res.invaildAdmin = "invaild admin",




res.successStatus = 200
res.failedStatus = 406 //  Not Acceptable
res.errorStatus = 500 // Internal Server Error

module.exports = res