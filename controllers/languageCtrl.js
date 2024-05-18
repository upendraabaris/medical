const LanguageModel = require("../models/languageModel")
const CountryLanguageMapping = require("../models/languageMappingModel")
const Client = require("../middleware/redis")
const getLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.find({ country_id: null });
        res.data = Language;
        res.status_Code = "200";
        next();
    } catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}


const getLanguageById = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findById(req.params.id);
        res.data = Language
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

const addLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.create(req.body);
        res.data = Language
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

const updateLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Language
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

const deleteLanguage = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.findByIdAndDelete(req.params.id);
        res.data = Language
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

const deleteAllLanguage = async (req, res, next) => {
    try {
        const idToDelete = req.body.id
        const deleteLanguage = await LanguageModel.deleteMany({_id: { $in: idToDelete}});
        res.data = deleteLanguage;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 403;
        res.message = error.message;
        res.data = {};
        next();
    }
}


const countryLanguageMapping = async(req,res,next)=>{
    try{
        const Language = await CountryLanguageMapping.create(req.body);
        res.data = Language
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

const getCountryLanguageMapping = async (req, res, next) => {
    try {
        const mappings = await CountryLanguageMapping.findOne({country_id: req.params.id}); 
        res.data = mappings;
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


// const getCountryLanguageMapping = async (req, res, next) => {
//     try {
//         const { country_id } = req.params.id; // Assuming country_id is sent in the query parameters
//         let mappings;

//         if (country_id) {
//             // If country_id is provided, filter mappings based on it
//             mappings = await CountryLanguageMapping.find({ country_id })
//                 .populate('country_id', 'country_name')
//                 .populate('language_id', 'name');
//         } else {
//             // If country_id is not provided, fetch all mappings
//             mappings = await CountryLanguageMapping.find()
//                 .populate('country_id', 'country_name')
//                 .populate('language_id', 'name');
//         }

//         res.data = mappings;
//         res.status_Code = "200";
//         next();
//     } catch (error) {
//         res.error = true;
//         res.status_Code = "403";
//         res.message = error.message;
//         res.data = {};
//         next();
//     }
// };

const getLanguageMultiple = async (req, res) => {
    try {
        const [languageData, mappingLanguage] = await Promise.all([
            getLanguage(),
            getCountryLanguageMapping(countryId)
        ]);
        res.json({ languageData, mappingLanguage });
    } catch (error) {
        if (res) {
            res.status(500).json({ error: error.message });
        } else {
            console.error("Response object is undefined");
        }
    }
}

// const getLanguageMultiple = async (req, res, next) => {
//     try {
//         const [languages, mappings] = await Promise.all([
//             LanguageModel.find({ country_id: null }),
//             CountryLanguageMapping.find()
//                 .populate('country_id', 'country_name')
//                 .populate('language_id', 'name')
//         ]);

//         res.status(200).json({ languages, mappings });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };




// const getStaffStats = async (req, res) => {
//     try {
//       const [genderRatio, ageRange] = await Promise.all([
//         getUserGenderRatio(),
//         getUserAgeRange()
//       ]);
  
//       res.json({ genderRatio, ageRange });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//रीजनल मैपिंग
const addMapping = async(req,res,next)=>{
    try{
        const Language = await LanguageModel.create(req.body);
        res.data = Language
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

const getDataByCountryId = async (req, res, next) => {
    try {
        const  country_id  = req.params.id;

        if (!country_id) {
            return res.status(400).json({ error: 'Country ID is required' });
        }

        const languageData = await LanguageModel.find({ country_id });
        
        res.data = languageData;
        res.status_Code = "200";
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = "500";
        res.message = error.message;
        res.data = {};
        next();
    }
};

const StateLanguageMapping = require("../models/stateLanguageMappingModel")

const stateLanguageMapping = async(req,res,next)=>{
    try{
        const Language = await StateLanguageMapping.create(req.body);
        res.data = Language
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

const getstateLanguageMapping = async(req,res,next)=>{
    try{
        const Language = await StateLanguageMapping.find();
        res.data = Language
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

const getStateLanguageMappingByStateId = async (req, res, next) => {
    try {
        const { state_id } = req.params;
        const stateLanguageMapping = await StateLanguageMapping.findOne({ state_id: state_id });

        if (!stateLanguageMapping) {
            return res.status(404).json({ message: "State language mapping not found" });
        }

        res.data = stateLanguageMapping;
        res.status_Code = 200;
        next();
    } catch (error) {
        res.error = true;
        res.status_Code = 500;
        res.message = error.message;
        res.data = {};
        next();
    }
};


module.exports = {getLanguage, getLanguageById, addLanguage, updateLanguage, deleteLanguage, deleteAllLanguage, countryLanguageMapping, getCountryLanguageMapping, getLanguageMultiple, addMapping, getDataByCountryId, stateLanguageMapping, getStateLanguageMappingByStateId, getstateLanguageMapping}
