const SosProfileModel = require("../../models/sos/sosProfileModel")

const getSosProfile = async(req,res,next)=>{
    try{
        const SosProfile = await SosProfileModel.find();
        res.data = SosProfile
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

const getSosProfileById = async(req,res,next)=>{
    try{
        const SosProfile = await SosProfileModel.findById(req.params.id);
        res.data = SosProfile
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

const addSosProfile = async(req,res,next)=>{
    try{
        const SosProfile = await SosProfileModel.create(req.body);
        res.data = SosProfile
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
const SosContactModel = require("../../models/sos/sosContactModel")

const addSosContact = async(req,res,next)=>{
    try{
        const SosContact = await SosContactModel.create(req.body);
        res.data = SosContact
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


const sosProfile = async(req,res)=>{
    try{
        console.log(req.body.profile)
        console.log(req.body.contact)
        let userProfileCheck = await SosProfileModel.findOne({userId:req.body.profile.userId})
        console.log(userProfileCheck)
        let SosContactNumber = await SosContactModel.findOne({userId:req.body.contact.userId})
        if(userProfileCheck){
            userProfileCheck = await SosProfileModel.findByIdAndUpdate(userProfileCheck._id, req.body.profile, {new: true})
        }else{
            userProfileCheck = await SosProfileModel.create(req.body.profile)
            console.log("hello")
        }
        if(SosContactNumber){
            SosContactNumber = await SosContactModel.findByIdAndUpdate(SosContactNumber._id, req.body.contact, {new: true})
        }
        else{
            SosContactNumber = await SosContactModel.create(req.body.contact)
        }
        res.status(200).json({message:"sucessfully added ",statusCode: "201",data:{userProfileCheck,SosContactNumber}})
    }
    catch (error) {
        if (res) {
            res.status(500).json({ error: error.message });
        } else {
            console.error("Response object is undefined");
        }
    }
}


const getsosProfile = async (req, res) => {
    try {
        const userProfile = await SosProfileModel.find({ userId: req.params.id });
        const sosContactNumber = await SosContactModel.find({ userId: req.params.id });

        if (userProfile.length === 0) {
            return res.status(200).json({ message: "User profile not found", statusCode: 404 });
        }

        if (sosContactNumber.length === 0) {
            return res.status(200).json({ message: "SOS contact number not found", statusCode: 404 });
        }

        res.status(200).json({ message: "Success", statusCode: 200, data: { userProfile, sosContactNumber } });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// const getLanguageMultiple = async (req, res) => {
//     try {
//         const [languageData, mappingLanguage] = await Promise.all([
//             getLanguage(),
//             getCountryLanguageMapping(countryId)
//         ]);
//         res.json({ languageData, mappingLanguage });
//     } catch (error) {
//         if (res) {
//             res.status(500).json({ error: error.message });
//         } else {
//             console.error("Response object is undefined");
//         }
//     }
// }

const updateSosProfile = async(req,res,next)=>{
    try{
        const SosProfile = await SosProfileModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SosProfile
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

const deleteSosProfile = async(req,res,next)=>{
    try{
        const SosProfile = await SosProfileModel.findByIdAndDelete(req.params.id);
        res.data = SosProfile
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

const getSosApplicationOfUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const SosProfile = await SosProfileModel.find({user_id: id})
            .populate({
                path: 'user_id',
                select: 'first_name last_name'
            });

        res.data = SosProfile;
        res.status_Code = "200";
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}


module.exports = {getSosProfile, getSosProfileById, addSosProfile, updateSosProfile, deleteSosProfile, getSosApplicationOfUser, sosProfile, getsosProfile}
