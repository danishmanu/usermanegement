const express=require("express");
const methodOverride = require('method-override')
const app=express();
const session = require('express-session');

const userRoutes=require('../routes/userRoutes');
const authRoutes=require('../routes/authRoutes')
const adminRoutes=require('../routes/adminRoutes')
const nocache=require("nocache")
const port=3000;
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(nocache());



app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))
app.set("view engine","ejs");
app.use(express.static("public"))

app.use('/', authRoutes);
app.use("/",userRoutes)
app.use("/admin",adminRoutes)
app.use("/",(req,res)=>{
    res.render("404")
})

app.listen(port,()=>{console.log(`server started on http://localhost:${port}/`)})