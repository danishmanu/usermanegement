const express=require("express");
const router=express.Router();

router.get("/home",(req,res)=>{
    if(req.session.isAdmin==true){
        res.redirect("/admin")  
    }
    else if(req.session.user){
        username=req.session.user
    res.render("index",{user:username});
}
else{
    res.redirect("/login")
}

})

module.exports=router