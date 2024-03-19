const EmrResponseModel = require("../../models/emr/emrResponseModel")

const getEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.find();
        res.data = EmrResponse
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

const getEmrResponseById = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findById(req.params.id);
        res.data = EmrResponse
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

const addEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.create(req.body);
        res.data = EmrResponse
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

const updateEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = EmrResponse
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

const deleteEmrResponse = async(req,res,next)=>{
    try{
        const EmrResponse = await EmrResponseModel.findByIdAndDelete(req.params.id);
        res.data = EmrResponse
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

const getQuestionnaire = async(req, res, next) =>{
    try{
        const EmrResponse = await EmrResponseModel.aggregate([
            {
                $lookup:{
                    from: "emrs",
                    localField: "emr_id",
                    foreignField: "_id",
                    as: "emr",
                }
            },
            {
                $lookup: {
                  from: 'emroptionmasters',
                  localField: 'emr_option_id',
                  foreignField: '_id',
                  as: 'emr_option'
                }
            },
            {
                $project: {
                  emr_response_id: 1,
                //   order: { $arrayElemAt: ['$order', 0] }, // Extract first element from array
                  emr: { $arrayElemAt: ['$emr', 0] },
                  emr_option: { $arrayElemAt: ['$emr_option', 0] }
                }
              }
        ])
        console.log(EmrResponse)
        res.data = EmrResponse
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

module.exports = {getEmrResponse, getEmrResponseById, addEmrResponse, updateEmrResponse, deleteEmrResponse, getQuestionnaire}
