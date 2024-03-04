const userModel = require("../models/user/userModel")
const bcrypt = require("bcryptjs")
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const login = async(req,res,next)=>{
    try{
        let email = req.body.email
        let password = req.body.password

        if (!validateEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        const user = await userModel.findOne({email: new RegExp(email,'i')})
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            res.status(201).send(user)
        }else
        {
            res.send("Invalid login details")
        }
    }catch(error){
        res.status(400).send("Invalid login details")
    }
}


module.exports = { login }
