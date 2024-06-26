const DiseaseModel = require("../../models/disease/diseaseModel")

const getDisease = async(req,res,next)=>{
    try{
        const Disease = await DiseaseModel.find();
        res.data = Disease
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

const getDiseaseById = async(req,res,next)=>{
    try{
        const Disease = await DiseaseModel.findById(req.params.id);
        res.data = Disease
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

// const addDisease = async(req,res,next)=>{
//     try{
        
//         const Disease = await DiseaseModel.create(req.body);
//         res.data = Disease
//         res.status_Code = "200"
//         next()
//     }catch(error){
//         res.error = true;
//         res.status_Code = "403";
//         res.message = error.message
//         res.data = {}
//         next()
//     }
// }


const addDisease = async(req,res,next)=>{
    try {
        let diseases = req.body.diseases
        const diseaseObjects = diseases.map(disease => ({ disease_name: disease }));
        console.log(diseaseObjects)
        // await DiseaseModel.insertMany(diseaseObjects);
        res.send('Diseases inserted successfully');
      } catch (error) {
        res.status(500).send('Error inserting diseases: ' + error.message);
      }
}

const updateDisease = async(req,res,next)=>{
    try{
        const Disease = await DiseaseModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Disease
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

const deleteDisease = async(req,res,next)=>{
    try{
        const Disease = await DiseaseModel.findByIdAndDelete(req.params.id);
        res.data = Disease
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


module.exports = {getDisease, getDiseaseById, addDisease, updateDisease, deleteDisease}
