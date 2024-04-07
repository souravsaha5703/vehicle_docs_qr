const express=require("express");
const path=require("path");
const session=require("express-session");
const router=require("./routes/index");
const userRouter=require("./routes/users");

const app=express();

const PORT=7000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret:'rto user info',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

app.use("/",router);
app.use("/",userRouter);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});