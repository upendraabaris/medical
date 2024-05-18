const SellerEngagementMappingModel = require("../../models/ecommerce/sellerEngagementMappingModel")

// const getSellerEngagementMapping = async(req,res,next)=>{
//     try{
//         const SellerEngagementMapping = await SellerEngagementMappingModel.find();
//         res.data = SellerEngagementMapping
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

// const getSellerEngagementMapping = async (req, res, next) => {
//     try {
//         const sellerEngagementMappings = await SellerEngagementMappingModel.find()
//             .populate({path:'seller_id', select: 'firstname lastname engagementType createdAt engagementLetter'})
//             // .populate('relationshipManager'); 

//         // const formattedData = sellerEngagementMappings.map(mapping => ({
//         //     // sellerName: `${mapping.seller_id.firstname} ${mapping.seller_id.lastname}`,
//         //     engagementType: mapping.engagementType,
//         //     engagementDate: mapping.createdAt,
//         //     // relationshipManager: mapping.relationshipManager ? mapping.relationshipManager.name : 'N/A',
//         //     engagementLetter: mapping.uploadEngagementLetter
//         // }));

//         res.json(sellerEngagementMappings);
//     } catch (error) {
//         res.status(500).json({ error: true, message: error.message, data: {} });
//     }
// }


const getSellerEngagementMapping = async (req, res, next) => {
    try {
        const sellerEngagementMappings = await SellerEngagementMappingModel.find({seller_id: req.params.id})
            .populate({
                path: 'seller_id',
                select: 'firstname lastname'
            })
            .populate({
                path: 'staff_id',
                select: 'first_name last_name'
            })
            .select('engagementType createdAt uploadEngagementLetter');

        res.json(sellerEngagementMappings);
    } catch (error) {
        res.status(500).json({ error: true, message: error.message, data: {} });
    }
}


const getSellerEngagementMappingById = async(req,res,next)=>{
    try{
        const SellerEngagementMapping = await SellerEngagementMappingModel.findById(req.params.id);
        res.data = SellerEngagementMapping
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
const jwt = require("jsonwebtoken")
const addSellerEngagementMapping = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        let user = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")
        console.log(token)
        // // Assuming you have extracted the staff_id from the token
        const _id = user._id;

        // // Add the staff_id to req.body
        req.body.staff_id = _id;

        // Create the SellerEngagementMapping
        const SellerEngagementMapping = await SellerEngagementMappingModel.create(req.body);

        res.data = SellerEngagementMapping;
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


const updateSellerEngagementMapping = async(req,res,next)=>{
    try{
        const SellerEngagementMapping = await SellerEngagementMappingModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = SellerEngagementMapping
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

const deleteSellerEngagementMapping = async(req,res,next)=>{
    try{
        const SellerEngagementMapping = await SellerEngagementMappingModel.findByIdAndDelete(req.params.id);
        res.data = SellerEngagementMapping
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
      const SellerEngagementMapping = await SellerEngagementMappingModel.aggregate([
        {
          $skip: req.params.page * req.params.count
        },
        {
          $limit: Number(req.params.count)
        }
      ])
      res.data = SellerEngagementMapping
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


//   const getSellerEngagementMapping = async (req, res, next) => {
//     try {
//         const sellerEngagementMappings = await SellerEngagementMappingModel.find()
//             .populate({
//                 path: 'seller_id',
//                 select: 'firstname lastname'
//             })
//             .populate({
//                 path: 'staff_id',
//                 select: 'first_name last_name'
//             })
//             .select('engagementType createdAt uploadEngagementLetter');

//         const formattedData = sellerEngagementMappings.map(mapping => ({
//             sellerName: mapping.seller_id ? `${mapping.seller_id.firstname || 'Unknown'} ${mapping.seller_id.lastname || 'Unknown'}` : 'Unknown',
//             staffName: mapping.staff_id ? `${mapping.staff_id.first_name || 'Unknown'} ${mapping.staff_id.last_name || 'Unknown'}` : 'Unknown',
//             engagementType: mapping.engagementType,
//             engagementDate: mapping.createdAt,
//             engagementLetter: mapping.uploadEngagementLetter
//         }));

//         res.json(formattedData);
//     } catch (error) {
//         res.status(500).json({ error: true, message: error.message, data: {} });
//     }
// }


module.exports = {getSellerEngagementMapping, getSellerEngagementMappingById, addSellerEngagementMapping, updateSellerEngagementMapping, deleteSellerEngagementMapping, pagination}
