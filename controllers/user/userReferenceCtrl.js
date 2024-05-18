const UserReferenceModel = require("../../models/user/userReferenceModel")

const StaffModel = require('../../models/staff/staffModel');
const SellerModel = require('../../models/ecommerce/sellersModel');
const UserMasterModel = require('../../models/user/userModel');
const jwt = require("jsonwebtoken")
const checkMobileNumber = async(req, res, next)=>{
    console.log("hello")
    try{
        const { mobile } = req.body;

        const staff = await StaffModel.findOne({ mobile, is_active: true });
        if (staff) {
            return res.status(200).json({ message: "The user is found in our in-house staff database. Please note that you can't add this user." });
        }

        const seller = await SellerModel.findOne({ mobile, is_active: true });
        if (seller) {
            return res.status(200).json({ message: "The user is found in our partner network database. Please note that you can't add this user." });
        }

        const userMaster = await UserMasterModel.findOne({ mobile }).populate('user_type_id client_id');
        
        if (userMaster) {
            const client = userMaster.client_id?.firstname || ''
            // Check if user_type_id exists before accessing its properties
                const userType = userMaster.user_type_id.user_type;
                console.log(userType)
                if(userType == 'Secondary User'){
                    return res.status(200).json({message:`The user is found in our database as a dependent user of another user. Only his parent/primary user can make him/her and app user. However, we are mapping this user with ${client}. Please ask the user to seek permission from his/her primary user.`
                })
                }else{
                    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
                    console.log(token)
                    const decodedToken = jwt.verify(token.replace('Bearer ', ''), "rbhafjekdwfskdfdfvbgjkd");
                    console.log(decodedToken)
                    let client_id = decodedToken.user;
                    if(userMaster?.client_id?._id == client_id){
                        return res.status(200).json({message:`The user is already found in our database mapped with . ${client} Kindly ask the user to download the app and start using our services.`})
                    }
                    else{
                        return res.status(200).json({message:`The user is already found in our database mapped with  different client. Kindly provide below details below to proceed.`,data:userMaster})
                    }
                }
                const userTypeMessage = userType == 'Primary User' ? `The user is already found in our database mapped with ${client}. Kindly ask the user to download the app and start using our services.` : `The user is found in our database as a dependent user of another user. Only his parent/primary user can make him/her and app user. However, we are mapping this user with ${client}. Please ask the user to seek permission from his/her primary user.`

                return res.status(200).json({ message: `${userTypeMessage}` });
    
        }
        const userReference = await UserReferenceModel.findOne({ mobile }).populate('user_type_id');
        if (userReference) {
            const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
            console.log(token)
            const decodedToken = jwt.verify(token.replace('Bearer ', ''), "rbhafjekdwfskdfdfvbgjkd");
            console.log(decodedToken)
            let clientId = decodedToken.user;
            if(userReference.clientID == clientId){
                return res.status(200).json({message:`The user is already found in our database but has not downloaded the application yet. Kindly ask the user to download the application and start using our services.`})
            }
            else{
                return res.status(200).json({message:'The user is already found in our database referred by another user but has not downloaded the application yet. Kindly ask the user to download the application and start using our services.'})
            }
            // return res.status(200).json({ message: `Mobile number already exists in UserReference records. User type: ${userMaster.user_type_id.user_type}` });
        }

        return res.status(404).json({ message: "Mobile number not found in any records." });
    }
    catch(error){
        console.log(error)
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}


const getUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.find();
        res.data = UserReference
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

const getUserReferenceById = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findById(req.params.id);
        res.data = UserReference
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

const addUserReference = async(req,res,next)=>{
    try{
        // const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
        // console.log(token)
        // const decodedToken = jwt.verify(token.replace('Bearer ', ''), "rbhafjekdwfskdfdfvbgjkd");

        // const clientID = decodedToken.user; // Extracting user ID from the decoded token
        let clientID;
        console.log(req.user)
        req.body.clientID = req.user
        const UserReference = await UserReferenceModel.create(req.body);
        res.data = UserReference
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

const updateUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = UserReference
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

const deleteUserReference = async(req,res,next)=>{
    try{
        const UserReference = await UserReferenceModel.findByIdAndDelete(req.params.id);
        res.data = UserReference
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

module.exports = {getUserReference, getUserReferenceById, addUserReference, updateUserReference, deleteUserReference, checkMobileNumber}
