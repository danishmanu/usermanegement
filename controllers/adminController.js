const bcrypt = require('bcrypt');
const collection = require("../src/config");

exports.adminCheck=(req,res,next)=>{
    if (req.session.user && req.session.isAdmin) {
        return next();
    }
    else {
        res.redirect("/login")
    }
}

exports.getUser = async (req, res) => {
  
        let userdata = await collection.find({ isAdmin: false })
        console.log(userdata)
        res.render("admin", { user: userdata })

   
}

exports.viewUser = async (req, res) => {
    
        try {
            let userdata = await collection.findOne({ _id: req.params.id })
            console.log(userdata)
            res.render("admin-view", { user: userdata })
        }
        catch (err) {
            console.log(err)
        }
 
}
exports.editUser = async (req, res) => {
  
        try {
            let userdata = await collection.findOne({ _id: req.params.id })
            
            res.render("admin-edit", { user: userdata })
        }
        catch (err) {
            console.log(err)
        }
 


}
exports.updateUser = async (req, res) => {

 
    id = req.params.id
    await collection.updateOne({ _id: id }, {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        isAdmin: false
    })

    res.redirect("/admin")



}
exports.deleteUser = async (req, res) => {
    try {
        id = req.params.id
        await collection.deleteOne({ _id: id })
       
        res.redirect("/admin")
    }
    catch (err) {
        console.log(err)
    }

}
exports.search= async (req,res)=>{
    search=req.body.search;
    let userdata = await collection.find({$and:[{isAdmin: false},{name:{$regex:new RegExp(search, 'i')}}]})
    res.render("admin-search", { user: userdata })
}
exports.addPage = async (req, res) => {
    if (req.session.user && req.session.isAdmin) {
        try {
     
            res.render("admin-add",{msg:req.session.msg})
        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        res.redirect("/login")
    }


}
exports.addUser = async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        isAdmin: false
    }

    const existuser = await collection.findOne({ $or: [{ name: data.name }, { email: data.email }] })

    if (existuser) {

        req.session.msg = "sorry user already exist"
        res.redirect("/admin/add")

    }
    else {

        // req.session.user = req.body.username

        const hashedpass = await bcrypt.hash(data.password, 10)
        data.password = hashedpass

        const userdata = await collection.insertMany(data)
        console.log(data)
        res.redirect("/admin")

    }
}
