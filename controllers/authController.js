const bcrypt = require('bcrypt');
const collection = require("../src/config");


exports.getSignup = (req, res) => {
    if (req.session.user) {
        res.redirect("/home");
    }

    else {
        msg = req.session.msg
        req.session.msg = null
        res.render("signup", { message: msg });
    }


}
exports.main = (req, res) => {
    if (req.session.user) {
        res.redirect("/home");
    }
    else {
        res.redirect("/login");
    }


}
exports.getLogin = (req, res) => {
    if (req.session.user) {
        res.redirect("/home");
    }
    else {
        msg = req.session.msg
        req.session.msg = null
        res.render("login", { message: msg })

    }

}
exports.login = async (req, res) => {

    try {
        const check = await collection.findOne({ name: req.body.username })
        if (check==null) {
            console.log("is work")
            req.session.msg = "sorry Invalid username or password"
            res.redirect("/login")
        }

        else{
            console.log(check)
            const match = await bcrypt.compare(req.body.password, check.password);
            if (check.isAdmin && match) {
    
                req.session.user = req.body.username;
                req.session.isAdmin = true
                res.redirect("/admin")
    
            }
            else {
             
                const match = await bcrypt.compare(req.body.password, check.password);
    
                if (match) {
                    req.session.user = req.body.username
    
                    res.redirect("/home")
                }
                else {
                    req.session.msg = "sorry Invalid username or password"
                    res.redirect("/")
                }
            }
        }
       
    } catch (error) {
        console.log(error)
    }


}
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect("/login")

        }
    })
}
exports.adminLogout = (req, res) => {
    if(req.session.isAdmin){
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            }
            else {
                res.redirect("/login")
    
            }
        })
    }
    
}
exports.signup = async (req, res) => {
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
        res.redirect("/signup")

    }
    else {

        req.session.user = req.body.username

        const hashedpass = await bcrypt.hash(data.password, 10)
        data.password = hashedpass

      await collection.insertMany(data)
        console.log(data)
        res.redirect("/home")

    }

}