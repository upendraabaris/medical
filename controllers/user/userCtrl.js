const UserModel = require("../../models/user/userModel")
const jwt = require("jsonwebtoken")
const familyModel = require("../../models/user/familyModel")
const mongoose = require("mongoose")
const getUser = async (req, res, next) => {
  try {
    // const user = await UserModel.find().populate('user_type_id').populate('nationality').populate('country_of_residence').exec();
    const user = await UserModel.find().populate(['user_type_id', 'nationality', 'country_of_residence', 'parent_user_id']).exec();
    // const user = await UserModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "usertypes",
    //       localField: "user_type_id",
    //       foreignField: "_id",
    //       as: "userfullinfo"
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "countries",
    //       localField: "nationality",
    //       foreignField: "_id",
    //       as: "countryinfo"
    //     }
    //   },
    //   {
    //     $unwind: "$countryinfo"
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       "user_type": 1,
    //       "fullName": { $concat: ["$first_name", " ", "$second_name", " ", "$last_name"] },
    //       "nationality": "$countryinfo.country_name",
    //       "mobile": 1,
    //       "email": 1,
    //       "country_of_residence": "$countryinfo.country_name",
    //       "dob": 1,
    //       "blood_group": 1,
    //       "gender": 1,
    //       "entry_date": 1,
    //       "status": 1,
    //       "abha_no": 1,
    //       "kcc_passport_no": 1,
    //       // "user_type_id": "$userfullinfo.user_type",
    //       "parent_user_id": 1,
    //       "referring_user_id": 1,
    //       "reporting_user_id": 1,
    //       "is_emergency_contact": 1,
    //       "pleadge_blood_donation": 1,
    //       "pleadge_organ_donation": 1,
    //       "client_id": 1,
    //       "national_digital_id": 1,
    //       "profile_pic": 1,

    //     }
    //   },
    // ]);

    res.data = user
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

const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).populate('user_type_id').populate('nationality').populate('country_of_residence').exec();
    res.data = user
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

const addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await UserModel.create(req.body);
    res.data = user
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

const updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.data = user
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

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    res.data = user
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

const pagination = async (req, res, next) => {
  try {
    const user = await UserModel.aggregate([
      {
        $skip: req.params.page * req.params.count
      },
      {
        $limit: Number(req.params.count)
      }
    ])
    res.data = user
    res.status_Code = "200"
    next()
  }
  catch (error) {
    res.error = true;
    res.status_Code = "403";
    res.message = error.message
    res.data = {}
    next()
  }
}

const addToFavorites = async (req, res) => {
  try {
    const userId = req.user; // Assuming userId is passed as a parameter
    const { favoriteUserId } = req.body; // Assuming favoriteUserId is passed in the request body

    // Check if the user already exists
    let user = await UserModel.findOne({ _id: userId });

    // Check if the favoriteUserId already exists in the isFavorite array
    if (user.isFavorite.includes(favoriteUserId)) {
      user.isFavorite = user.isFavorite.filter((fav) => fav != favoriteUserId);
      await user.save();
      // If favoriteUserId already exists, return a message indicating it's already a favorite
      return res.json({ message: "Removed from favorite", status: "203" });
    }

    // Add favoriteUserId to the isFavorite array
    user.isFavorite.push(favoriteUserId);

    // Save the updated user
    await user.save();

    // Return success response
    res.status(200).json({ message: 'User added to favorites successfully.', status: "202" });
  } catch (error) {
    console.error('Error adding user to favorites:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}


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

    const { mobile, email, relation_type_id, /* isLoginPermit */   } = req.body
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
      // isLoginPermit: isLoginPermit || false,
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
    // const parentId = req.params.parentId;
    // console.log(parentId)

    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(401).json({ message: 'Token not provided' });
    // }
    // const verifytoken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds")?.user;


    // Find the parent user
    // const parentUser = await UserModel.findById(parentId);
    const parentUser = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user) // Convert parentId to ObjectId
        }
      },
      {
        $lookup: {
          from: 'countries', // Collection name
          localField: 'nationality',
          foreignField: '_id',
          as: 'nation'
        }
      },
      {
        $project: {
          user_type_id: 1,
          name: { $concat: ["$first_name", " ", "$second_name", " ", "$last_name"] },
          dob: "$dob",
          blood_group: "$blood_group",
          gender: "$gender",
          nationality: "$nation.country_name",
          date_of_issue: "$createdAt"
        }
      }
    ])
    if (!parentUser) {
      return res.status(404).json({ message: 'Parent user not found' });
    }

    // Find all family members belonging to the parent user
    // const familyMembers = await UserModel.find({ parent_user_id: parentId });

    const familyMembers = await UserModel.aggregate([
      // Match documents with the given parent user ID
      { $match: { parent_user_id: new mongoose.Types.ObjectId(req.user) } },
      // Lookup to get family member details
      {
        $lookup: {
          from: 'users', // Collection name
          localField: 'parent_user_id',
          foreignField: '_id',
          as: 'parentUser'
        }
      },
      {
        $lookup: {
          from: 'countries', // Collection name
          localField: 'nationality',
          foreignField: '_id',
          as: 'nation'
        }
      },
      // Project to reshape the output
      {
        $project: {
          user_type_id: 1,
          name: { $concat: ["$first_name", " ", "$second_name", " ", "$last_name"] },
          dob: "$dob",
          blood_group: "$blood_group",
          gender: "$gender",
          nationality: "$nation.country_name",
          date_of_issue: "$createdAt"
        }
      }
    ]);


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


const getProfile = async (req, res, next) => {
  try {
    const parentUser = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user) // Convert parentId to ObjectId
        }
      },
      {
        $lookup: {
          from: 'countries', // Collection name
          localField: 'nationality',
          foreignField: '_id',
          as: 'nation'
        }
      },
      {
        $project: {
          user_type_id: 1,
          // name: { $concat: ["$first_name", " ", "$second_name", " ", "$last_name"] },
          first_name: "$first_name",
          second_name: "$second_name",
          last_name: "$last_name",
          dob: "$dob",
          blood_group: "$blood_group",
          gender: "$gender",
          nationality: "$nation.country_name",
          email: "$email",
          mobile: "$mobile",
          date_of_issue: "$createdAt"
        }
      }
    ])
    if (!parentUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Construct the response object containing parent user data and family member data
    const responseData = {
      userProfile: parentUser,
    };

    // Send the response
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
};




module.exports = { getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember, getFamilyMembers, deleteFamilyMember, getProfile, editProfile }
