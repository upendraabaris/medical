const DepartmentModel = require("../models/departmentModel")

const getDepartment = async(req,res,next)=>{
    try{
        // let client = await Client.get('Department');
        // let Department;
        // if(client == null) {
        //     Department = await DepartmentModel.find()
        //     await Client.set(`Department`, JSON.stringify(Department));
        // }
        // else {
        //     Department = JSON.parse(client);
        // }
        const Department = await DepartmentModel.find()
        res.data = Department
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

const getDepartmentById = async(req,res,next)=>{
    try{
        const Department = await DepartmentModel.findById(req.params.id);
        res.data = Department
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

const addDepartment = async(req,res,next)=>{
    try{
        const Department = await DepartmentModel.create(req.body);
        res.data = Department
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

const updateDepartment = async(req,res,next)=>{
    try{
        const Department = await DepartmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Department
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

const deleteDepartment = async(req,res,next)=>{
    try{
        const Department = await DepartmentModel.findByIdAndDelete(req.params.id);
        res.data = Department
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

module.exports = {getDepartment, getDepartmentById, addDepartment, updateDepartment, deleteDepartment}
