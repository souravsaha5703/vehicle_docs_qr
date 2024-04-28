require('dotenv').config();
const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const router=require("./routes/index");
const usersRouter=require("./routes/users");
const vehiclesRouter=require("./routes/vehicles");

const app=express();
const PORT=process.env.PORT

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"rtodb"
});

app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET"],
    credentials:true
}));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",router);
app.use("/",usersRouter);
app.use("/",vehiclesRouter);

app.get("/adminlogout",function(req,res){
    req.session.destroy(err=>{
        if(err){
            console.error(err)
        }else{
            res.clearCookie('connect.sid');
            return res.json({logout:true})
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
});