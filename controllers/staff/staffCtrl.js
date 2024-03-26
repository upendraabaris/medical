const StaffModel = require("../../models/staff/staffModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Client = require("../../middleware/redis")
const getStaff = async(req,res,next)=>{
    try{
        // let client = await Client.get('Staff');
        // let Staff;
        // if(client == null) {
        //     Staff = await StaffModel.find()
        //     await Client.set(`Staff`, JSON.stringify(Staff));
        // }
        // else {
        //     Staff = JSON.parse(client);
        // }
        const Staff = await StaffModel.find()
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getStaffById = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findById(req.params.id);
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.create(req.body);
        console.log(Staff)
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndDelete(req.params.id);
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const validateMobile = (input) => {
    let test = input; /* .slice(3) */
    var validRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (test.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

const loginStaff = async(req,res,next)=>{
    try{
        let email = req.body.email
        let password = req.body.password
        

        if (!validateEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        const staff = await StaffModel.findOne({email: new RegExp(email,'i')})
        const isMatch = await bcrypt.compare(password,staff.password)
        console.log(isMatch)
        if(isMatch){
            const token = jwt.sign({staff:staff._id}, "shicsdfhaljkvfjckds", {expiresIn: 3600 })
            res.status(201).send(
                {
                    user: {
                      "token": token,
                      "first_name": staff.first_name,
                      "last_name": staff.last_name,
                      "profile_pic": staff.profile_pic
                    }
                  }
            )
        }else
        {
            res.send("Invalid login details")
        }
    }catch(error){
        console.log(error)
        res.status(400).send("Invalid login details")
    }
}


module.exports = {getStaff, getStaffById, addStaff, updateStaff, deleteStaff, loginStaff}
