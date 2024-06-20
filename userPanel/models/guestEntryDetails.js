require('dotenv').config();
const mongoose=require('mongoose');

const connection=mongoose.connect(process.env.MONGODB_CONNECTION);

connection.then(()=>{
    console.log("Guest Model Successfully Connected");
}).catch((err)=>{
    console.log(`Error occured ${err}`);
});

const GuestEntriesSchema=new mongoose.Schema({
    vehicleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GuestVehicleDetails'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('GuestEntryDetail',GuestEntriesSchema);