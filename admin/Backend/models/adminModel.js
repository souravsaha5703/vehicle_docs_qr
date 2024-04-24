require('dotenv').config();
const mongoose=require('mongoose');

const connection=mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(()=>{
    console.log("Database successfully connected for admin panel");
}).catch((err)=>{
    console.log(`Error occured ${err}`);
});

const adminSchema=new mongoose.Schema({
    adminName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true
    },
    valid:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('Admin',adminSchema);