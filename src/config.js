const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/calio')
.then((result)=>{
console.log("mongo connected")
   
})
.catch((err)=>console.log(err))

const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    ,password:{
        type:String,
        required:true
    },fname:{
        type:String,
        required:true
    },lname:{
        type:String,
        required:true
    }

    ,isAdmin:{
        type:Boolean,
        required:true
    }
})

const collection=new mongoose.model("users",loginSchema);

module.exports=collection;