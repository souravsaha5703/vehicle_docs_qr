require('dotenv').config();
const jwt=require("jsonwebtoken");

function setUser(user){
    return jwt.sign({
        _id:user._id,
        name:user.fullname,
        email:user.email,
        ph:user.phoneno
    },process.env.JWT_SECRET,{expiresIn:'1d'});
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser
}