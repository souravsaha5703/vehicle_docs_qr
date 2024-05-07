require('dotenv').config();
const mongoose=require('mongoose');

const connection=mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(()=>{
    console.log("Admin Model Successfully Connected");
}).catch((err)=>{
    console.log(`Error occured ${err}`);
});

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin_email:{
        type:String,
        required:true,
        unique:true
    },
    company_name:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports=mongoose.model('Admin',adminSchema);