const SellerUserModel = require("../../models/ecommerce/sellerUserModel")

const getSellerUser = async (req, res, next) => {
    try {
        const SellerUser = await SellerUserModel.find({ seller_id: req.params.id });
        res.data = SellerUser
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

const getSellerUserById = async (req, res, next) => {
    try {
        const SellerUser = await SellerUserModel.findById(req.params.id);
        res.data = SellerUser
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

const addSellerUser = async (req, res, next) => {
    try {
        const SellerUser = await SellerUserModel.create(req.body);
        res.data = SellerUser
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

const updateSellerUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
        console.log(token)
        const decodedToken = jwt.verify(token.replace('Bearer ', ''), "rbhafjekdwfskdfdfvbgjkd");

        const _id = decodedToken.user;
        console.log(_id)
        const SellerUser = await SellerUserModel.findByIdAndUpdate(_id, req.body, { new: true });
        res.data = SellerUser
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

const deleteSellerUser = async (req, res, next) => {
    try {
        const SellerUser = await SellerUserModel.findByIdAndDelete(req.params.id);
        res.data = SellerUser
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
        const SellerUser = await SellerUserModel.aggregate([
            {
                $skip: req.params.page * req.params.count
            },
            {
                $limit: Number(req.params.count)
            }
        ])
        res.data = SellerUser
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

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const validateMobile = (input) => {
    let test = input; /* .slice(3) */
    var validRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (test.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}
const loginSellerUser = async (req, res, next) => {
    try {
        let { mobile, password, user_pin } = req.body;
        let user;

        if (password) {
            // If mobile number is provided, find the user by mobile
            // user = await SellerUserModel.findOne({ mobile }).populate({
            //     path: 'seller_id',
            //     select: 'sellerType seller_id',
            //     populate: {
            //         path: 'sellerType',
            //         select: 'seller_type'
            //     }
            // });
            // user = await SellerUserModel.findOne({ mobile }).populate('seller_id');
            user = await SellerUserModel.findOne({ mobile }).populate({ path: 'seller_id',
            populate: {
                        path: 'sellerType parent_id',
                    }})
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign({ user: user._id }, "rbhafjekdwfskdfdfvbgjkd", { expiresIn: 24 * 60 * 60 });
                res.status(200).json({
                    user: {
                        "_id": user._id,
                        "token": token,
                        "data":user,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "profile_pic": user.profile_pic,
                        "sellerType": user.seller_id.sellerType,
                        "firstTimeLogin": user.firstTimeLogin,
                        "role": user.role,
                        "createdAt": user.createdAt
                    }
                });
            } else {
                res.status(200).send("Invalid login details");
            }
        } else {
            // If user_pin is provided, find the user by user_pin
            // user = await SellerUserModel.findOne({ mobile }).populate({
            //     path: 'seller_id',
            //     select: 'sellerType',
            //     populate: [{
            //         path: 'sellerType',
            //         select: 'seller_type'
            //     },
            //     {
            //         path: 'seller_id'
            //     }]
            // });
            
            user = await SellerUserModel.findOne({ mobile }).populate({ path: 'seller_id',
            populate: {
                        path: 'sellerType parent_id',
                    }})
            if (user_pin == user.user_pin) {
                const token = jwt.sign({ user: user._id }, "rbhafjekdwfskdfdfvbgjkd", { expiresIn: 24 * 60 * 60 });
                res.status(200).json({
                    user: {
                        "_id": user._id,
                        "token": token,
                        "data":user,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "profile_pic": user.profile_pic,
                        "sellerType": user.seller_id.sellerType,
                        "firstTimeLogin": user.firstTimeLogin,
                        "role": user.role,
                        "createdAt": user.createdAt
                    }
                });
            } else {
                res.status(200).send("Invalid login details");
            }

        }

        if (!user) {
            return res.status(404).send("User not found.");
        }


    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};



const forgotPasswordChange = async (req, res, next) => {
    try {

        const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
        console.log(token)
        const decodedToken = jwt.verify(token.replace('Bearer ', ''), "rbhafjekdwfskdfdfvbgjkd");

        const seller_id = decodedToken.user; // Extracting user ID from the decoded token
        console.log(seller_id)

        const { user_pin, password } = req.body;


        let user;

        if (user_pin) {
            user = await SellerUserModel.findById(seller_id)
            user.user_pin = user_pin;
            user.firstTimeLogin = true
            await user.save();
        }

        if (password) {
            user = await SellerUserModel.findById(seller_id)
            user.password = password;
            await user.save();
        }

        // if (seller_id) {
        //     user = await SellerUserModel.findOne({ _id: seller_id }); // Using _id field to find the user by seller_id
        // } else {
        //     user = await SellerUserModel.findOne({ user_pin });
        // }

        // if (!user) {
        //     throw new Error("Account not found.");
        // }

        // const newPassword = req.body.password;

        // if (user.password === newPassword) {
        //     throw new Error("New password cannot be the same as the old password.");
        // }

        // user.password = newPassword;
        // await user.save();

        res.status(200).json({
            message: "Password changed successfully.",
            user: user._id
        });
    } catch (error) {
        res.status(402).json({
            error: true,
            message: error.message
        });
    }
};

const UserModel = require("../../models/user/userModel")
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

  const getPatientUserByMobile = async (req, res, next) => {
    try {
      const user = await UserModel.find({mobile:req.params.mobile}).populate('user_type_id nationality country_of_residence', 'user_type country_name country_name ')
    //   const user = await UserModel.find({mobile:req.params.mobile}).populate(['user_type_id', 'nationality', 'country_of_residence', 'parent_user_id']).exec();
    
    if(user.length === 0){
        console.log()
        return res.status(200).json({
            status_Code: 404,
            message: 'Patient user not found with the provided mobile number.',
            error: true
          });
    }
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
  

module.exports = { getSellerUser, getSellerUserById, addSellerUser, updateSellerUser, deleteSellerUser, pagination, loginSellerUser, forgotPasswordChange, addUser, getPatientUserByMobile }
