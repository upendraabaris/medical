const UserModel = require("../../models/user/userModel")
const jwt = require("jsonwebtoken")
const familyModel = require("../../models/user/familyModel")
const mongoose = require("mongoose")
const cloudinary = require("../../utils/cloudinary");
const {cloudinaryUploadImg, cloudinaryDeleteImg} =  require("../../utils/cloudinary")
const path = require("path")
const UserType = require("../../models/user/userTypeModel")
const UserDocModel = require("../../models/documentModel")
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
    console.log(verifytoken)
    const parentUser = await UserModel.findById(verifytoken || req.body.parent_user_id);
    if (!parentUser) {
      return res.status(404).json({ message: 'Parent user not found' });
    }

    const { mobile, email, relation_type_id, /* isLoginPermit */   } = req.body
    const existingFamilyMember = await UserModel.findOne({
      parent_user_id: verifytoken || req.body.parent_user_id,
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
      parent_user_id: verifytoken || req.body.parent_user_id
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
          date_of_issue: "$createdAt",
          first_name: "$first_name",
          second_name: "$second_name",
          last_name: "$last_name",
          email: "$email",
          mobile: "$mobile",
          profile_pic: "$profile_pic",
          isDeath: 1
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
      {
        $lookup: {
          from: 'userrelations', // Collection name
          localField: 'relation_type_id',
          foreignField: '_id',
          as: 'relation'
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
          date_of_issue: "$createdAt",
          first_name: "$first_name",
          second_name: "$second_name",
          last_name: "$last_name",
          email: "$email",
          mobile: "$mobile",
          relation: "$relation.relationtype",
          profile_pic: "$profile_pic",
          isDeath: 1
        }
      }
    ]);
    const filteredFamilyMembers = familyMembers.filter(member => !member.isDeath)
    
    // Construct the response object containing parent user data and family member data
    const responseData = {
      parentUser: parentUser,
      familyMembers: filteredFamilyMembers
    };

    // Send the response
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getFamilyMembersByStaff = async (req, res, next) => {
  try {
    let userId = req.params.userId
    const parentUser = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId) // Convert parentId to ObjectId
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
          date_of_issue: "$createdAt",
          first_name: "$first_name",
          second_name: "$second_name",
          last_name: "$last_name",
          email: "$email",
          mobile: "$mobile",
          isDeath: 1
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
      { $match: { parent_user_id: new mongoose.Types.ObjectId(userId) } },
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
      {
        $lookup: {
          from: 'userrelations', // Collection name
          localField: 'relation_type_id',
          foreignField: '_id',
          as: 'relation'
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
          relation: "$relation.relationtype",
          date_of_issue: "$createdAt",
          first_name: "$first_name",
          second_name: "$second_name",
          last_name: "$last_name",
          email: "$email",
          mobile: "$mobile",
          isDeath: 1
        }
      }
    ]);
    console.log(familyMembers)
    const filteredFamilyMembers = familyMembers.filter(member => !member.isDeath)
    
    // Construct the response object containing parent user data and family member data
    const responseData = {
      parentUser: parentUser,
      familyMembers: filteredFamilyMembers
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
          profile_pic: "$profile_pic",
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
    const { first_name, second_name, last_name, dob, blood_group, gender, nationality, email, mobile, profile_pic } = req.body;

    // Check if the email or mobile exists for any other user
    // const existingUser = await UserModel.findOne({
    //   $and: [
    //     { _id: { $ne: req.params.id } }, // Exclude the current user
    //     { $or: [{ email }, { mobile }] } // Check if email or mobile matches
    //   ]
    // });
    const existingUser = await UserModel.findOne(req.params.isDeath)

    // if (existingUser) {
    //   // Email or mobile already exists for another user
    //   return res.status(400).json({ message: 'Email or mobile is connected with another user' });
    // }

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
      mobile,
      profile_pic
    };

    // Update the user's profile information in the database
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

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

const userUpdateProfileImage = (async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId)
    const newProfilePicUrl = req.body.profile_pic; // Assuming the new profile picture URL is sent in the request body

    // Update the user's profile picture URL in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profile_pic: newProfilePicUrl },
      { new: true }
    );

    if (!updatedUser) {
      // If the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Send a response indicating successful profile picture update
    res.json({ message: "Profile picture updated successfully", profile_pic: updatedUser.profile_pic });
    // // let id = req.user._id;
    // if (req.file != undefined) {
    
    // const imagepath = path.resolve("uploads/"+ req.file.filename);

    //   const user = await UserModel.findById(req.params.userId);
    //   try{
    //     await cloudinary
    //     .cloudinaryDeleteImg(user?.profile_pic?.public_id)
    //     .then((result) => {});
    //   }catch(error){
    //   }

    //   const img = await  cloudinary.cloudinaryUploadImg(imagepath)
    //   console.log(img)
    //   const updatedUser = await UserModel.findByIdAndUpdate(
    //     req.params.userId,
    //     {
    //       profile_pic: img.url,
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    //   res.json({message: "profile picture updated successfully", pfofile_pic:updatedUser.profile_pic});
    // } else {
    //   throw new Error("Please Upload the image");
    // }
  } catch (error) {
    throw new Error(error);
  }
});


// const userUpdateProfileImage = async(req,res)=>{
//   try{
//     const UserDoc = await UserModel.findOneAndUpdate(req.params.id)
//     res.data = UserDoc
//     res.status_Code = "200"
//     next()
// }catch(error){
//     res.error = true;
//     res.status_Code = "403";
//     res.message = error.message
//     res.data = {}
//     next()
// }
// }

const addUserDoc = async(req,res,next)=>{
  try{
      req.body.user_id = req.user
      const UserDoc = await UserDocModel.create(req.body)
      res.data = UserDoc
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

const addUserDocByStaff = async(req,res,next)=>{
  try{
      req.body.user_id = req.params.id
      const UserDoc = await UserDocModel.create(req.body)
      res.data = UserDoc
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

const updateUserDoc = async(req,res,next)=>{
  try{
      const UserDoc = await UserDocModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      console.log(UserDoc)
      res.data = UserDoc
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

const deleteUserDoc = async(req,res,next)=>{
  try{
      const UserDoc = await UserDocModel.findByIdAndDelete(req.params.id)
      console.log(UserDoc)
      res.data = UserDoc
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


const getCountByCategoryForUser = async (req,res) => {
  try {
    const counts = await UserDocModel.aggregate([
      { $match: { user_id: new mongoose.Types.ObjectId(req.user) } }, // Match documents for the specified user
      { $group: { _id: "$category", count: { $sum: 1 } } },
      {$project: { _id:0,ctaegory:"$_id", count:1}} // Group documents by category and count them
    ]);
     res.json(counts);
  } catch (error) {
    throw new Error("Error in counting documents by category: " + error.message);
  }
};



const userTypeUpgrade = async (req,res) => {
  try {
    // Find the user by ID
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is already a primary user
    if (user.user_type_id === '65df43baaa8e764bd45b51f0') {
      throw new Error('User is already a primary user');
    }

    // Find the primary user type
    const primaryUserType = await UserType.findOne({ user_type: 'Primary User' });
    if (!primaryUserType) {
      throw new Error('Primary User type not found');
    }

    // Update the user's user_type_id to primary_user
    user.user_type_id = primaryUserType._id;
    await user.save();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


const getUserDocumentsByCategory = async (req, res, next) => {
  try {
    // const userId = req.user || req.body.user_id
    const category = req.body.category
    // Fetch documents based on the specified category
    const documents = await UserDocModel.find({ category });
    await UserDocModel.populate(documents, { path: 'user_id selectFamilyMember', select: 'first_name second_name last_name email mobile' })
    console.log(documents)
    // Check if any documents were found
    if (!documents || documents.length === 0) {
      throw new Error('No documents found for the specified category');
    }

    // return documents;
    res.data = documents
    next()
  } catch (error) {
    // Handle errors
    throw new Error(error.message);
  }
}








const deleteFamilyMember = async (req, res, next) => {
  try {
    // Extract the family member's ID and cause of death from the request body
    // const memberId = req.params.memberId;
    const { memberId, causeOfDeath } = req.body;

    // Find the family member by ID
    const familyMember = await UserModel.findById(memberId);
    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Check if the user is already marked as deceased
    if (familyMember.isDeath) {
      return res.status(400).json({ message: 'Family member is already marked as deceased' });
    }

    // Mark the family member as deceased and set the cause of death
    familyMember.isDeath = true;
    familyMember.causeOfDeath = causeOfDeath;
    await familyMember.save();

    // Send success response
    res.status(200).json({ message: 'Family member marked as deceased successfully' });
    next();
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
    next();
  }
};

/* ---- user voluntary deletion start ---- */
const deleteUserVoluntary = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set deletion status to "archived" and record timestamp
    user.deletionStatus = 'archived';
    user.archivedAt = new Date();
    await user.save();

    res.json({ message: "User archived successfully", data: user });
  } catch (error) {
    console.error("Error archiving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Background process or cron job to remove archived users after 1 minute
const removeExpiredArchivedUsers = async () => {
  try {
    const oneMinuteAgo = new Date();
    oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);

    await UserModel.deleteMany({ deletionStatus: 'archived', archivedAt: { $lt: oneMinuteAgo } });
    console.log("Expired archived users removed successfully.");
  } catch (error) {
    console.error("Error removing expired archived users:", error);
  }
};

// Schedule the removal process to run every minute
// setInterval(removeExpiredArchivedUsers, 60 * 1000); // Run every minute

// use cron job schedular


/* ---- user voluntary deletion end ---- */


const getUserGenderRatio = async () => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const maleUsers = await UserModel.countDocuments({ gender: 'Male' });

    return {
      male: maleUsers,
      female: totalUsers - maleUsers,
      total: totalUsers
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserAgeRange = async () => {
  try {
    const today = new Date();
    const users = await UserModel.find({}, { dob: 1 });
    const totalUsers = users.length;

    let ageGroups = {
      '0-20': 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-60': 0,
      '61+': 0
    };

    users.forEach(user => {
      let birthDate = new Date(user.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      
      // Adjust for leap years
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Categorize users into age groups
      if (age <= 20) {
        ageGroups['0-20']++;
      } else if (age <= 30) {
        ageGroups['21-30']++;
      } else if (age <= 40) {
        ageGroups['31-40']++;
      } else if (age <= 50) {
        ageGroups['41-50']++;
      } else if (age <= 60) {
        ageGroups['51-60']++;
      } else {
        ageGroups['61+']++;
      }
    });

    return { ageGroups, totalUsers };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserStats = async (req, res) => {
  try {
    const [genderRatio, ageRange] = await Promise.all([
      getUserGenderRatio(),
      getUserAgeRange()
    ]);

    res.json({ genderRatio, ageRange });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addProductToWishlist = async (req, res, next) => {
  try {
    const userId = req.user;
    const productId = req.body.productId;

    // Find the user by their ID
    const user = await UserModel.findById({_id:userId});
    // console.log(user)
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the product is already in the wishlist
    // if (user.wishlist.includes(productId)) {
    //   user.wishlist.pop(productId);
    //   const updatedUser = await user.save();
    //   res.status_Code = 200;
    //   res.message = 'Product unlisted from wishlist';
    //   res.data = user;
    //   return next();
    // }
    const productIndex = user.wishlist.indexOf(productId);
    if (productIndex > -1) {
      // Product is already in wishlist, remove it
      user.wishlist.splice(productIndex, 1);
      res.message = 'Product removed from wishlist';
    } else {
      // Product is not in wishlist, add it
      user.wishlist.push(productId);
      res.message = 'Product added to wishlist';
    }

    // Add the product to the wishlist
    // user.wishlist.push(productId);
    
    // Save the updated user document
    const updatedUser = await user.save();

    res.data = updatedUser;
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


const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user;
    console.log(userId)
    // Find the user by their ID
    const wishlist = await UserModel.findById(userId)
  .select('first_name last_name') // You only need to select the fields you want from the user document
  .populate({
    path: 'wishlist', // Populate the 'wishlist' field
    populate: {
      path: 'category_id', // Populate the 'category_id' field within the 'wishlist' array
      select: 'category_name' // Select only the 'category_name' field from the populated document
    }
  });
    // console.log(user)
    if (!wishlist) {
      throw new Error('No item in wishlist');
    }

    res.data = wishlist;
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


module.exports = { getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember, getFamilyMembers, deleteFamilyMember, getProfile, editProfile, userUpdateProfileImage, userTypeUpgrade, getFamilyMembersByStaff, addUserDoc, getUserDocumentsByCategory, addUserDocByStaff, updateUserDoc, deleteUserDoc, getCountByCategoryForUser, deleteUserVoluntary, getUserGenderRatio, getUserStats, addProductToWishlist, getWishlist }
