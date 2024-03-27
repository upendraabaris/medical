const UserModel = require("../../models/user/userModel")
const jwt = require("jsonwebtoken")
const getUser = async (req, res, next) => {
  try {
    // const user = await UserModel.find().populate('user_type_id').populate('nationality').populate('country_of_residence').exec();
    // const user = await UserModel.find().populate(['user_type_id', 'nationality', 'country_of_residence']).exec();
    const user = await UserModel.aggregate([
      {
        $lookup: {
          from: "usertypes",
          localField: "user_type_id",
          foreignField: "_id",
          as: "userfullinfo"
        }
      },
      {
        $lookup: {
          from: "countries",
          localField: "nationality",
          foreignField: "_id",
          as: "countryinfo"
        }
      },
      {
        $unwind: "$countryinfo"
      },
      {
        $project: {
          _id: 0,
          "user_type": 1,
          "fullName": { $concat: ["$first_name", " ", "$second_name", " ", "$last_name"] },
          "nationality": "$countryinfo.country_name",
          "mobile": 1,
          "email": 1,
          "country_of_residence": "$countryinfo.country_name"
        }
      },
    ]);

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

    // const existingFamilyMember = await UserModel.findOne({
    //   parent_user_id: verifytoken,
    //   /* Add other conditions to check if the family member already exists */
    // });
    // if (existingFamilyMember) {
    //   return res.status(409).json({ message: 'Family member already exists for the parent user' });
    // }

    const familyMember = await UserModel.create({
      ...req.body,
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


module.exports = { getUser, getUserById, addUser, updateUser, deleteUser, pagination, addToFavorites, addFamilyMember }
