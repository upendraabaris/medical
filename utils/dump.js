const addFamilyMember = async (req, res, next) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }
      const verifytoken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")?.user
      // console.log(verifytoken)
      const parentUser = await UserModel.findById(verifytoken);
      if (!parentUser) {
        return res.status(404).json({ message: 'Parent user not found' });
      }
  
      const { mobile, email, relation_type_id  } = req.body
      const existingFamilyMember = await UserModel.findOne({
        parent_user_id: verifytoken,
        $or: [{ mobile }, { email }]
      });
  
      if (existingFamilyMember) {
        // Family member with the same mobile number or email already exists
        res.data = "member already exist with same email or mobile";
        res.status_Code = "200";
        next();
        return;
      }
      // const existingFamilyMember = await UserModel.findOne({
      //   parent_user_id: verifytoken,
      //   /* Add other conditions to check if the family member already exists */
      // });
      // if (existingFamilyMember) {
      //   return res.status(409).json({ message: 'Family member already exists for the parent user' });
      // }
  
      const familyMember = await UserModel.create({
        ...req.body,
        relation_type_id,
        parent_user_id: verifytoken
      });
      res.data = familyMember
      res.status_Code = "200"
      next()
    } catch (error) {
      res.error = true;
      res.status_Code = "403";
      res.message = error.message
      res.data = {}
      next()
    }
  }
  
  
  const getFamilyMembers = async (req, res, next) => {
    try {
      // Extract the parent user's ID from the request parameters
      const parentId = req.params.parentId;
      console.log(parentId)
  
      // const token = req.headers.authorization;
      // if (!token) {
      //   return res.status(401).json({ message: 'Token not provided' });
      // }
      // const verifytoken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")?.user;
  
  
      // Find the parent user
      const parentUser = await UserModel.findById(parentId);
      if (!parentUser) {
        return res.status(404).json({ message: 'Parent user not found' });
      }
  
      // Find all family members belonging to the parent user
      const familyMembers = await UserModel.find({ parent_user_id: parentId });
  
      // Construct the response object containing parent user data and family member data
      const responseData = {
        parentUser: parentUser,
        familyMembers: familyMembers
      };
  
      // Send the response
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  const deleteFamilyMember = async (req, res, next) => {
    try {
      // Extract the family member's ID from the request parameters
      const memberId = req.params.memberId;
  
      // Find the family member by ID
      const familyMember = await UserModel.findById(memberId);
      if (!familyMember) {
        return res.status(404).json({ message: 'Family member not found' });
      }
  
      // Delete the family member
      await UserModel.findByIdAndDelete(memberId);
  
      // Send success response
      res.status(200).json({ message: 'Family member deleted successfully' });
      next()
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: error.message });
      next()
    }
}


const editProfile = async (req, res, next) => {
  try {
    // const userId = req.user; // Get the user ID from the token or wherever it's stored

    // Extract the updated profile data from the request body
    const { first_name, second_name, last_name, dob, blood_group, gender, nationality, email, mobile } = req.body;

    // Check if the email or mobile exists for any other user
    const existingUser = await UserModel.findOne({
      $and: [
        { _id: { $ne: req.user } }, // Exclude the current user
        { $or: [{ email }, { mobile }] } // Check if email or mobile matches
      ]
    });

    if (existingUser) {
      // Email or mobile already exists for another user
      return res.status(400).json({ message: 'Email or mobile is connected with another user' });
    }

    // if(!existingUser || existingUser.user_type_id !== "65df43baaa8e764bd45b51f0"){
    //   return res.status(400).json({ message: 'Only primary user can edit' });
    // }

    // Construct the update object with the provided data
    const updateData = {
      first_name,
      second_name,
      last_name,
      dob,
      blood_group,
      gender,
      nationality,
      email,
      mobile
    };

    // Update the user's profile information in the database
    const updatedUser = await UserModel.findByIdAndUpdate(req.user, updateData, { new: true });

    // Check if the user exists and has been updated
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated profile information in the response
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};




// const addFamilyMember = async(req,res,next)=>{
//   try{
//     email = req.body.email
//     mobile = req.body.mobile
//     if(req.body.relative_id == null && email != undefined && email != null && mobile != undefined && mobile != null){
//       const finduser = await UserModel.findOne({ $or: [{mobile, email: new RegExp(email,'i')}]})
//       if(finduser != null){
//         throw new Error("user already exist")
//       }
//       const finduser1 = await UserModel.findById(req.user)
//       if(finduser1.user_type_id != "65df43baaa8e764bd45b51f0"){
//         throw new Error("only primary user can add member.")
//       }
//       console.log("error")
//       const user = await UserModel.create({
//         first_name: req.body.first_name,
//         second_name: req.body.second_name,
//         last_name: req.body.last_name,
//         dob: req.body.dob,
//         gender: req.body.gender,
//         blood_group: req.body.blood_group,
//         nationality: req.body.nationality,
//         country_of_residence: req.body.country_of_residence,
//         mobile: req.body.isLogin? req.body.mobile: undefined,
//         email: req.body.isLogin? req.body.email: undefined,
//         parent_user_id: req.body.isLogin? undefined : req.user,
//         addBy: req.user
//       })
      
//       const family = await familyModel.create({
//         relative_id: user._id,
//         user_id: req.user,
//         relation_type_id: req.body.relation_type_id,
//         isPermitted: req.body.isPermitted
//       })
//       res.data = family
//       res.status_Code = "200"
//       next()
//     }
//     else if (req.body.relative_id != null && req.body.relative_id != undefined ){
//       const finduser = await familyModel.findOne({
//         $or: [{relative_id: req.body.relative_id,
//           user_id: req.user}, {relative_id: req.user,
//             user_id: req.body.relative_id}]
//       })
//       if(finduser != null){
//         throw new Error("family member already exist")
//       }
//       const family = await familyModel.create({
//         relative_id: req.body.relative_id,
//         user_id: req.user,
//         relation_type_id: req.body.relation_type_id,
//         isPermitted: req.body.isPermitted
//       })
      
//       res.data = family
//       res.status_Code = "200"
//       next()
//     }
//     else{
//       throw new Error("All conditions not fullfilled.")
//     }
//   }catch(error){
//     console.log(error)
//     res.error = true;
//     res.status_Code = "403";
//     res.message = error.message
//     res.data = {}
//     next()
//   }
// }

// const getFamilyMembers = async (req, res, next) => {
//   try {
//     const familyMembers = await familyModel.aggregate([
//       {
//         $match:{
//           user_id: new mongoose.Types.ObjectId(req.user)
//         }
//       },
//       {
//         $lookup:{
//           from: "users",
//           localField: "relative_id",
//           foreignField: "_id",
//           as: "user"
//         }
//       },
//       {
//         $lookup:{
//           from: "relations",
//           localField: "relation_type_id",
//           foreignField: "_id",
//           as: "relation"
//         }
//       },
//       {
//         $project:{
//           _id: 1,
//           name: { $concat: [{$first: "$user.first_name"}, " ", {$first:"$user.second_name"}, " ", {$first:"$user.last_name"}] },
//           dob: {$first: "$user.dob"},
//           blood_group: {$first: "$user.blood_group"},
//           gender: {$first: "$user.gender"},
//           nationality: {$first: "$user.nationality"},
//           date_of_issue: "$createdAt",
//         }
//       }

//     ]);
//     const familyMembers1 = await familyModel.aggregate([
//       {
//         $match:{
//           relative_id: new mongoose.Types.ObjectId(req.user)
//         }
//       },
//       {
//         $lookup:{
//           from: "users",
//           localField: "user_id",
//           foreignField: "_id",
//           as: "user"
//         }
//       },
//       {
//         $lookup:{
//           from: "relations",
//           localField: "relation_type_id",
//           foreignField: "_id",
//           as: "relation"
//         }
//       },
//       {
//         $project:{
//           _id: 1,
//           name: { $concat: [{$first: "$user.first_name"}, " ", {$first:"$user.second_name"}, " ", {$first:"$user.last_name"}] },
//           dob: {$first: "$user.dob"},
//           blood_group: {$first: "$user.blood_group"},
//           gender: {$first: "$user.gender"},
//           nationality: {$first: "$user.nationality"},
//           date_of_issue: "$createdAt",
//         }
//       }

//     ]);
//     familyMembers.push(...familyMembers1);
//     console.log(familyMembers)
//     res.status(200).json({ familyMembers });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// const deleteFamilyMember = async (req, res, next) => {
//   try {
//     // Extract the family member's ID from the request parameters
//     const memberId = req.params.memberId;

//     // Find the family member by ID
//     const familyMember = await UserModel.findById(memberId);
//     if (!familyMember) {
//       return res.status(404).json({ message: 'Family member not found' });
//     }

//     // Delete the family member
//     await UserModel.findByIdAndDelete(memberId);

//     // Send success response
//     res.status(200).json({ message: 'Family member deleted successfully' });
//     next()
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//     next()
//   }
// };


const mongoose = require("mongoose")
const HealthIdSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  middleName: String,
  mobile: String,
  // Add more fields as required
});
const HealthId = mongoose.model('HealthId', HealthIdSchema)
const axios = require("axios")
router.post('/api/v1/registration/aadhaar/createHealthIdWithAadhaarOtp', async (req, res) => {
  try {
    // Call Aadhaar service to create Health ID
    const response = await axios.post('https://healthidsbx.abdm.gov.in/api/v1/registration/aadhaar/createHealthIdWithPreVerified', req.body, {
      headers: {
        'accept': '*/*',
        'Accept-Language': 'en-US',
        'Content-Type': 'application/json'
      }
    });

    // Assuming the response contains ABHA number
    const abhaNumber = response.data.abhaNumber;

    // Save the data to MongoDB
    const healthId = new HealthId(req.body);
    await healthId.save();

    res.status(200).json({ abhaNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
