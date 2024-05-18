const FavoriteContactModel = require("../models/favoriteContactModel")
const Client = require("../middleware/redis")
const sellerModel = require("../models/ecommerce/sellersModel")
const getFavoriteContact = async (req, res, next) => {
    try {
        const FavoriteContact = await FavoriteContactModel.find({user_id:req.params.id})
            .populate({ path: 'user_id', select: 'first_name last_name' })
            // .populate({path:'seller_id', select:'firstname lastname sellerType addressLine1'})
            .populate({ 
                path: 'seller_id', 
                // select: 'firstname lastname sellerType addressLine1 country state city',
                populate: {
                    path: 'sellerType country state city postal_code medical_specialty_id accreditations',
                    // model: 'sellerType',
                    select: 'seller_type country_name state_name city_name postalCode medical_specialty'
                },
            })
            .lean();
        res.data = FavoriteContact
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

const SellerModel = require("../models/ecommerce/sellersModel")
const getFavoriteContactByType = async (req, res, next) => {
    try {
        let sellerTypeId = req.params.id;
        console.log(sellerTypeId);
        

        // Find FavoriteContacts based on sellerTypeId
        const favoriteContacts = await FavoriteContactModel.find({
            user_id: req.user
          })
            // .populate({
            //     path: 'seller_id',
            //     // Optionally populate sellerType and other details
            //     // populate: {
            //     //     path: 'sellerType country state city postal_code medical_specialty_id accreditations',
            //     //     select: 'seller_type country_name state_name city_name postalCode medical_specialty'
            //     // }
            // })
            // .lean();
            const sellerIds = favoriteContacts.map(contact => contact.seller_id);

            // Query the seller table to find sellerType and seller_id
            const sellers = await SellerModel.find({
              _id: { $in: sellerIds },
              sellerType: sellerTypeId
            })
            .populate({
                path: 'sellerType country state city postal_code medical_specialty_id accreditations sub_speciality_id superSpecializationIds',
                select: 'seller_type country_name state_name city_name postalCode medical_specialty sub_speciality super_specialization'
            });
        console.log(sellers);

        res.data = sellers;
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

// const favoriteContacts = await FavoriteContactModel.find({
//     'seller_id.sellerType': { $in: [sellerTypeId] }
//     })




const checkMobileNumber = async(req,res,next)=>{
    try {
        const FavoriteContact = await sellerModel.findOne({mobile: req.body.mobile}).populate(['country','state','city','sellerType','postal_code']);
        res.data = FavoriteContact
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


const createSeller = (async (req, res) => {
    try {
      req.body.accCompany_id = req.companyId;

    //   const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
    //   const decodedToken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds");
    //   let staff_id = decodedToken.staff;
  
    //   // if (String(req.companyId) === "65704962662a1b5b3deba16a" && req.body.sellerType === undefined) {
    //   //   req.body.sellerType = "6572f517ca6e2f0164a813a1";
    //   // }
      
    //   req.body.staff_id = staff_id;
  
      const sellers = await sellerModel.create(req.body);
      const message = "Seller created successfully";
  
      res.status(201).json({ message, sellers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


const getFavoriteContactById = async (req, res, next) => {
    try {
        const FavoriteContact = await FavoriteContactModel.findById(req.params.id);
        res.data = FavoriteContact
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

// const addFavoriteContact = async (req, res, next) => {
//     try {
//         let user_id = req.user
//         // console.log(req.user)
//         req.body.user_id = user_id
//         const FavoriteContact = await FavoriteContactModel.create(req.body);
//         res.data = FavoriteContact
//         res.status_Code = "200"
//         next()
//     } catch (error) {
//         res.error = true;
//         res.status_Code = "403";
//         res.message = error.message
//         res.data = {}
//         next()
//     }
// }

const addFavoriteContact = async (req, res, next) => {
    try {
        let { seller_id, user_id } = req.body;

        const existingFavoriteContact = await FavoriteContactModel.findOne({ user_id, seller_id });

        if (existingFavoriteContact) {
            // If the entry already exists, return a message
            res.status(200).json({ message: "Favorite contact already exists for this user and seller.", status_Code:400 });
        } else {
            // If the entry doesn't exist, proceed to create a new entry
            const favoriteContact = await FavoriteContactModel.create(req.body);
            res.data = favoriteContact;
            res.status_Code = "200";
            next();
        }
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}

const addFavoriteContactByPublic = async (req, res, next) => {
    try {
        let { seller_id } = req.body;

        let user_id = req.user;
        const existingFavoriteContact = await FavoriteContactModel.findOne({ user_id:req.user, seller_id });

        if (existingFavoriteContact) {
            // If the entry already exists, return a message
            res.status(200).json({ message: "Favorite contact already exists for this user and seller.", status_Code:400 });
        } else {
            // If the entry doesn't exist, proceed to create a new entry
            req.body.user_id = user_id
            const favoriteContact = await FavoriteContactModel.create(req.body);
            res.data = favoriteContact;
            res.status_Code = "200";
            next();
        }
    } catch (error) {
        res.error = true;
        res.status_Code = "403";
        res.message = error.message;
        res.data = {};
        next();
    }
}


const updateFavoriteContact = async (req, res, next) => {
    try {
        const FavoriteContact = await FavoriteContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.data = FavoriteContact
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

const deleteFavoriteContact = async (req, res, next) => {
    try {
        const FavoriteContact = await FavoriteContactModel.findByIdAndDelete(req.params.id);
        res.data = FavoriteContact
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

module.exports = { getFavoriteContact, getFavoriteContactById, addFavoriteContact, updateFavoriteContact, deleteFavoriteContact, checkMobileNumber, createSeller, addFavoriteContactByPublic, getFavoriteContactByType }
