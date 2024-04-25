const structure = {}
structure.AccountStructure = (data)=>{
    return {
        "userId": data?.userId ?? 0,
        "emailId": data?.emailId ?? "",
        "isAdmin": data.isAdmin ?? false,
        "emailVerified": data?.emailVerified ?? false,
        "isDeleted": data?.isDeleted ?? false,
        "login": data?.login ?? false,
        "firstName": data?.profile?.firstName ?? "",
        "lastName": data?.profile?.lastName ?? "",
        "phoneNumber": data?.profile?.phoneNumber ?? "",
        "companyName": data?.profile?.companyName ?? "",
        "employeeId": data?.profile?.employeeId ?? 0,
        "role": data?.profile?.role ?? ""
    }
}
module.exports = structure