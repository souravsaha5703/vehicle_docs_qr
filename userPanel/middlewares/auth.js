const {getUser}=require("../service/authtoken");

async function restrictedToLoggedInUserOnly(req,res,next){
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(403).json({ message: 'No token provided' });

    const user=getUser(token);
    if(!user) return res.status(403).json({ message: 'Token is not valid' });

    req.user=user;
    next();
}

module.exports={
    restrictedToLoggedInUserOnly,
}