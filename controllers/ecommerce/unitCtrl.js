const UnitModel = require("../../models/ecommerce/unitModel")

const getUnit = async(req,res,next)=>{
    try{
        const Unit = await UnitModel.find();
        res.data = Unit
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

const getUnitById = async(req,res,next)=>{
    try{
        const Unit = await UnitModel.findById(req.params.id);
        res.data = Unit
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

const addUnit = async(req,res,next)=>{
    try{
        const Unit = await UnitModel.create(req.body);
        res.data = Unit
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

const updateUnit = async(req,res,next)=>{
    try{
        const Unit = await UnitModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Unit
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

const deleteUnit = async(req,res,next)=>{
    try{
        const Unit = await UnitModel.findByIdAndDelete(req.params.id);
        res.data = Unit
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

const pagination = async(req, res, next) =>{
    try{
      const Unit = await UnitModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = Unit
      res.status_Code = "200"
      next()
    }
    catch(error){
          res.error = true;
          res.status_Code = "403";
          res.message = error.message
          res.data = {}
          next()
    }
  }

module.exports = {getUnit, getUnitById, addUnit, updateUnit, deleteUnit, pagination}
