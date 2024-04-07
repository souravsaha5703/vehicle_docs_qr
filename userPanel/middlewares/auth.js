const {getUser}=require("../service/authtoken");

async function restrictedToLoggedInUserOnly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid) return res.redirect("/");

    const user=getUser(userUid);
    if(!user) return res.redirect("/");

    req.user=user;
    next();
}

module.exports={
    restrictedToLoggedInUserOnly,
}