const express=require("express");
const cors=require('cors');
const path=require("path");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const router=require("./routes/index");
const vehicleRouter=require("./routes/vehicles");
const adminRouter=require("./routes/admin");
const vehicleEntryDetailsRouter=require("./routes/vehicleEntryDetails");

const app=express();

const PORT=7000;

app.use(cors({
    origin:["https://vehicledocs360scanner.vercel.app","http://localhost:7000","http://localhost:5173"],
    methods:["POST","GET"],
    credentials:true
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret:'rto user info',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

app.use("/",router);
app.use("/",vehicleRouter);
app.use("/",adminRouter);
app.use("/",vehicleEntryDetailsRouter);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});