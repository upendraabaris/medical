const ProductCostVariation = require("../../models/ecommerce/productCostVariationModel");
const Seller = require("../../models/ecommerce/sellersModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
// const { generateToken } = require("../config/jwtToken");

// const cloudinary = require("../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");

const sellerLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    let findSeller = await Seller.findOne({
      email,
    });
    if (findSeller != null) {
      if (!findSeller.approve) {
        throw new Error("Seller is not approve!");
      }
      let pass = await findSeller.isPasswordMatched(req?.body?.password);
      if (pass) {
        res.json({
          message: "Successfully Login.",
          // token: generateToken({ id: findSeller?._id, type: "Seller" }),
          token: jwt.sign({id: findSeller?._id}, "cvgfahfefvyufeiwffrhu", {expiresIn: 24*60*60 }),
          seller: { firstname: findSeller.firstname, lastname: findSeller.lastname, profile_pic: findSeller.profilePhoto},
          code: "200",
        });
      } else {
        res.status(402).json({
          message: "That Email Id or Password not correct.",
          code: "258",
        });
      }
    } else if (findSeller == null) {
      res
        .status(401)
        .json({ message: "That Email Id or Password not correct." });
    } else {
      res
        .status(403)
        .json({ message: "That Email Id or Password not correct." });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updatedSeller = asyncHandler(async (req, res) => {
  const id = req.body.sellerid;

  try {
    let image;

    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
      req.body.profilePhoto = image;
      const categ = await Seller.findById(id);

      await cloudinary
        .cloudinaryDeleteImg(categ?.image?.public_id)
        .then((result) => {});

      const updatedSeller = await Seller.findByIdAndUpdate(
        id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
          currency: req?.body?.currency,
          language: req?.body?.language,
          addressLine1: req?.body?.addressLine1,
          addressLine2: req?.body?.addressLine2,
          city: req?.body?.city,
          state: req?.body?.state,
          country: req?.body?.country,
          landmark: req?.body?.landmark,
          province: req?.body?.province,
          currency: req?.body?.currency,
          language: req?.body?.language,
          profilePhoto: req?.body?.profilePhoto,
        },
        {
          new: true,
        }
      );

      res.json(updatedSeller);
    } else {
      const updatedSeller = await Seller.findByIdAndUpdate(
        id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
          currency: req?.body?.currency,
          language: req?.body?.language,
          addressLine1: req?.body?.addressLine1,
          addressLine2: req?.body?.addressLine2,
          city: req?.body?.city,
          state: req?.body?.state,
          country: req?.body?.country,
          landmark: req?.body?.landmark,
          province: req?.body?.province,
          currency: req?.body?.currency,
          language: req?.body?.language,
        },
        {
          new: true,
        }
      );
      res.json(updatedSeller);
    }
  } catch (error) {
    throw new Error(error);
  }
});


const getDoctorSellerList = async(req,res)=>{
  try{
    const seller = await Seller.find({sellerType: "65fd7f1bca55fe86cf326849"}).populate(["medicine_type_id", "medical_specialty_id","superSpecializationIds", "hos_clinic_type_id","award","doctor_hospital_list", "empanelment","country", "state", "city" ]).lean();
    res.json(seller)
  }catch(error){
    throw new Error(error)
  }
}

const PhotoGalleryModel = require("../../models/ecommerce/sellerPhotoGalleryModel")

const getPhotoGalleryById = async(req,res,next)=>{
  try{
      const PhotoGallery = await PhotoGalleryModel.find()
      res.data = PhotoGallery
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

const getDoctorSellerList1 = async (req, res, next) => {
  console.log("hello")
  try {
    const doctorSellers = await getDoctorSellerList(req, res, next);
    const photoGallery = await getPhotoGalleryById(req, res, next);
    
    res.json({ doctorSellers, photoGallery });
  } catch (error) {
    next(error);
  }
};


const getDoctorSellerListBySearch = async (req, res, next) => {
  try {
    const { city, specialty } = req.body; // Extract city and specialty from request body
    
    // Check if city and specialty are provided
    if (!city || !specialty) {
      return res.status(400).json({ error: 'City and specialty are required.' });
    }

    // Construct the query object based on the provided parameters
    const query = {
      sellerType: "65fd7f1bca55fe86cf326849",
      city: city,
      medical_specialty_id: specialty
    };

    // Find sellers based on the constructed query
    const sellers = await Seller.find(query)
                                .populate(["medicine_type_id", "medical_specialty_id", "superSpecializationIds", "hos_clinic_type_id"])
                                .lean();

    // Check if any sellers were found
    if (sellers.length === 0) {
      return res.status(404).json({ message: 'No sellers found for the provided criteria.' });
    }

    res.json(sellers); // Send the list of sellers as the response
  } catch (error) {
    next(error); // Pass the error to the global error handler middleware
  }
};



const getHospitalSellerList = async (req, res) => {
  try {
    const seller = await Seller.find({ sellerType: "65fd7f30ca55fe86cf3268a5" })
                                 .populate(["medicine_type_id", "medical_specialty_id", "superSpecializationIds", "hos_clinic_type_id", "empanelment", "country", "state", "city"])
                                 .lean();
    res.json(seller);
  } catch (error) {
    throw new Error(error);
  }
};


const getFavoriteHospitalSellerList = async(req,res)=>{
  try{
    const seller = await Seller.find({sellerType: "65fd7f30ca55fe86cf3268a5", isfavorite:true}).populate(["medicine_type_id", "medical_specialty_id","superSpecializationIds", "hos_clinic_type_id", "empanelment", "country", "state", "city"])
    if (seller.length === 0) {
      res.json({ message: "Favorite hospital list is empty!" });
    } else {
        res.json(seller);
    }
  }catch(error){
    throw new Error(error)
  }
}

const getFavoriteDoctorSellerList = async(req,res)=>{
  try{
    const seller = await Seller.find({sellerType: "65fd7f1bca55fe86cf326849", isfavorite: true}).populate(["medicine_type_id", "medical_specialty_id","superSpecializationIds", "hos_clinic_type_id", "award", "doctor_hospital_list", "country", "state", "city"])
    if (seller.length === 0) {
      res.json({ message: "Favorite doctor list is empty!" });
    } else {
        res.json(seller);
    }
  }catch(error){
    throw new Error(error)
  }
}

const toggleFavoriteStatus = async (req, res) => {
  try {
      const { sellerId, isFavorite } = req.body;
      
      // Find the seller by ID
      const seller = await Seller.findById(sellerId);
      if (!seller) {
          return res.status(404).json({ message: "Seller not found" });
      }
      
      // Update the isfavorite field based on the provided value
      seller.isfavorite = isFavorite;
      await seller.save();

      res.json({ message: "Favorite status updated successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const getSingleSellerDetails = async(req,res)=>{
  try{
    const seller = await Seller.aggregate([
      {
        $match: {
          // role: "Seller", // Filter sellers with role 'Seller'
          // approve: true, // Filter approved sellers
          
          // sellerType: new mongoose.Types.ObjectId(req.params.usertypeid),
          _id: new mongoose.Types.ObjectId(req.params.sellerId)
        }// Filter sellers by userType
        },
        {
          $lookup: {
            from: "users", // Assuming the User model is named 'User'
            localField: "user_id",
            foreignField: "_id",
            as: "user_details"
          }
      },
      {
        $lookup:{
          from: "hospitalclinictypes",
          localField: "hos_clinic_type_id",
          foreignField: "_id",
          as: "clinic_type"
        }
      },
      {
        $unwind: {path: "$user_details", preserveNullAndEmptyArrays: true} // Unwind the user_details array
      },
      {
        $unwind: {path: "$clinic_type", preserveNullAndEmptyArrays: true} // Unwind the user_details array
      },
      {
        $unwind: { path: "$superSpecializationIds", preserveNullAndEmptyArrays: true}
      },
      {
        $lookup: {
            from: "superspecializations",
            localField: "superSpecializationIds",
            foreignField: "_id",
            as: "specializations"
        }
    },
    {
        $unwind: { path: "$specializations", preserveNullAndEmptyArrays: true }
    },
    {
      $lookup: {
        from: "sellerphotogalleries",
        localField: "_id", // Assuming _id in Seller is referenced as seller_id in PhotoGalleryModel
        foreignField: "seller_id",
        as: "photo_gallery"
      }
    },
    {
      $lookup: {
        from: 'sellers', // Replace with the actual collection name
        localField: 'doctor_hospital_list',
        foreignField: '_id',
        as: 'doctor_hospital_list' // Replace with the actual array field name
      }
    },
    // {
    //   $group: {
    //     _id: "$_id",
    //     // Other fields from existing grouping stage
        
    //   }
    // },
    
      {
        $group:{
          _id: "$_id",
          // user_id: {firstname: {$first: "$user_details.first_name"},  lastname: {$first: "$user_details.last_name"}},
          user_id_firstname: { $first: "$user_details.first_name"},
          user_id_lastname: { $first: "$user_details.last_name"},
          firstname: {$first: "$firstname"},
          lastname: {$first: "$lastname"},
          email: {$first: "$email"},
          mobile: {$first: "$mobile"},
          profilePhoto: {$first: "$profilePhoto"},
          dob: {$first: "$dob" },
          role: {$first: "$role" },
          approve: {$first: "$approve" },
          city: {$first: "$city"},
          address: {$first:"$address"},
          state: {$first:"$state"},
          rating: {$first:"$rating"},
          sellerType: {$first:"$sellerType"},
          parent_hos_clinic_id: {$first:"$parent_hos_clinic_id"},
          hos_clinic_name: {$first:"$hos_clinic_name"},
          hos_clinic_type_id: {$first:"$clinic_type"},
          accreditations: {$first:"$accreditations"},
          special_note: {$first:"$special_note"},
          isfavorite: {$first:"$isfavorite"},
          referring_user_id: {$first:"$referring_user_id"},
          is_surgeon: {$first:"$is_surgeon"},
          zone_id: {$first:"$zone_id"},
          is_super30: {$first:"$is_super30"},
          medical_specialty_id: {$first:"$medical_specialty_id"},
          qualifications: {$first:"$qualifications"},
          briefbio: {$first:"$briefbio"},
          doctorbio: {$first:"$doctorbio"},
          doctor_fee_IND: {$first:"$doctor_fee_IND"},
          doctor_fee_INT: {$first:"$doctor_fee_INT"},
          superSpecializationIds: {$addToSet: {specialization:"$specializations.super_specialization"}},
          designation: {$first: "$designation"},
          addressLine1: {$first: "$addressLine1"},
          doctor_hospital_list: {$first:"$doctor_hospital_list"},
          // photo_gallery: { $first: "$photo_gallery" }
        }
      }
    ])
    res.json(seller)
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

// const getSellerDetailsByTypes = async(req,res, next)=>{
//   try{
//     const seller = await Seller.find({sellerType: req.params.usertypeid})
//     res.data = seller
//     res.status_Code = "200"
//     next()
//   } catch (error) {
//     res.error = true;
//     res.status_Code = "403";
//     res.message = error.message
//     res.data = {}
//     next()
//   }
// }

const getSellerDetailsByTypes = async(req,res)=>{
  try{
    const seller = await Seller.aggregate([
      {
        $match: {
          // role: "Seller", // Filter sellers with role 'Seller'
          // approve: true, // Filter approved sellers
          
          sellerType: new mongoose.Types.ObjectId(req.params.usertypeid),
        }// Filter sellers by userType
        },
        {
          $lookup: {
            from: "users", // Assuming the User model is named 'User'
            localField: "user_id",
            foreignField: "_id",
            as: "user_details"
          }
      },
      {
        $lookup:{
          from: "hospitalclinictypes",
          localField: "hos_clinic_type_id",
          foreignField: "_id",
          as: "clinic_type"
        }
      },
      {
        $lookup:{
          from: "usertypes",
          localField: "sellerType",
          foreignField: "_id",
          as: "sellertype"
        }
      },
      {
        $unwind: {path: "$user_details", preserveNullAndEmptyArrays: true} // Unwind the user_details array
      },
      {
        $unwind: {path: "$clinic_type", preserveNullAndEmptyArrays: true} // Unwind the user_details array
      },
      {
        $unwind: { path: "$superSpecializationIds", preserveNullAndEmptyArrays: true}
      },
      // {
      //   $unwind: { path: "$sellertype", preserveNullAndEmptyArrays: true}
      // },
      {
        $lookup: {
            from: "superspecializations",
            localField: "superSpecializationIds",
            foreignField: "_id",
            as: "specializations"
        }
    },
    {
        $unwind: { path: "$specializations", preserveNullAndEmptyArrays: true }
    },
      {
        $group:{
          _id: "$_id",
          // user_id: {firstname: {$first: "$user_details.first_name"},  lastname: {$first: "$user_details.last_name"}},
          user_id_firstname: { $first: "$user_details.first_name"},
          user_id_lastname: { $first: "$user_details.last_name"},
          firstname: {$first: "$firstname"},
          lastname: {$first: "$lastname"},
          email: {$first: "$email"},
          mobile: {$first: "$mobile"},
          profilePhoto: {$first: "$profilePhoto"},
          dob: {$first: "$dob" },
          role: {$first: "$role" },
          approve: {$first: "$approve" },
          city: {$first: "$city"},
          address: {$first:"$address"},
          state: {$first:"$state"},
          rating: {$first:"$rating"},
          sellerType: {$first:"$sellertype.user_type"},
          parent_hos_clinic_id: {$first:"$parent_hos_clinic_id"},
          hos_clinic_name: {$first:"$hos_clinic_name"},
          hos_clinic_type_id: {$first:"$clinic_type"},
          accreditations: {$first:"$accreditations"},
          special_note: {$first:"$special_note"},
          isfavorite: {$first:"$isfavorite"},
          referring_user_id: {$first:"$referring_user_id"},
          is_surgeon: {$first:"$is_surgeon"},
          zone_id: {$first:"$zone_id"},
          is_super30: {$first:"$is_super30"},
          medical_specialty_id: {$first:"$medical_specialty_id"},
          qualifications: {$first:"$qualifications"},
          briefbio: {$first:"$briefbio"},
          doctorbio: {$first:"$doctorbio"},
          doctor_fee_IND: {$first:"$doctor_fee_IND"},
          doctor_fee_INT: {$first:"$doctor_fee_INT"},
          superSpecializationIds: {$addToSet: {specialization:"$specializations.super_specialization"}}
        }
      }
    ])
    res.json(seller)
  }catch(error){
    throw new Error(error);
  }
}


const getSellerList = asyncHandler(async (req, res) => {
  try {
    const allSellers = await Seller.find({ accCompany_id: req.companyId })
      // .populate("user_id")
      .sort({ createdAt: 1 });
    res.json(allSellers);
  } catch (error) {
    throw new Error(error);
  }
});


const getSellerPaginationList = asyncHandler(async (req, res) => {
  try {
    const allSellers = await Seller.find({ accCompany_id: req.companyId })
      .populate("user_id")
      .skip(req.params.id * 10)
      .limit(10);
    res.json(allSellers);
  } catch (error) {
    throw new Error(error);
  }
});

const createSeller = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;

    const token = req.headers.authorization; // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), "shicsdfhaljkvfjckds");
    let staff_id = decodedToken.staff;

    // if (String(req.companyId) === "65704962662a1b5b3deba16a" && req.body.sellerType === undefined) {
    //   req.body.sellerType = "6572f517ca6e2f0164a813a1";
    // }
    
    req.body.staff_id = staff_id;

    const sellers = await Seller.create(req.body);
    const message = "Seller created successfully";

    res.status(201).json({ message, sellers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // let image;

    // if (req.file != undefined) {
    //   image = await cloudinary.cloudinaryUploadImg(
    //     __dirname + "/uploads/" + req.file.filename
    //   );
    //   req.body.profilePhoto = image;
    //   const categ = await Seller.findById(id);

    //   await cloudinary
    //     .cloudinaryDeleteImg(categ?.image?.public_id)
    //     .then((result) => {});

      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json(updatedSeller);
    // } else {
    //   const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
    //     new: true,
    //   });
    //   res.json(updatedSeller);
    // }
  } catch (error) {
    throw new Error(error);
  }
});

const updateSellerProfile = asyncHandler(async (req, res) => {
  // const  id  = req.user._id;
  const id = req.params.id
  try {
    // let image;

    // if (req.file != undefined) {
    //   image = await cloudinary.cloudinaryUploadImg(
    //     __dirname + "/uploads/" + req.file.filename
    //   );
    //   req.body.profilePhoto = image;
    //   const categ = await Seller.findById(id);

    //   await cloudinary
    //     .cloudinaryDeleteImg(categ?.image?.public_id)
    //     .then((result) => {});

      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json(updatedSeller);
    // } else {
    //   const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
    //     new: true,
    //   });
    //   res.json(updatedSeller);
    }
  catch (error) {
    throw new Error(error);
  }
});

const deleteSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const sellerProduct = await ProductCostVariation.find({
      accCompany_id: req.companyId,
      seller_id: id,
    });
    if (sellerProduct.length > 0) {
          throw new Error("This seller have same products on sale so you can't delete seller details without deleting them!");
    } else if (String("64269f0df127906d53878d3d") == String(id)) {
      res.json({ message: "Sorry! you can't delete this seller" });
    } else {
      const deletedSeller = await Seller.findOneAndDelete({ _id: id, accCompany_id: req.companyId });
      // res.json(deletedSeller);
      if (!deletedSeller) {
        return res.status(404).json({ message: "Seller not found" });
      }
      res.json({ message: "Seller deleted successfully", data: deletedSeller });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchSeller = asyncHandler(async (req, res) => {
  try {
    const getSearchedSeller = await Seller.find({
      accCompany_id: req.companyId,
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedSeller);
  } catch (error) {
    throw new Error(error);
  }
});

const sortSeller = asyncHandler(async (req, res) => {
  try {
    let country = [];
    let state = [];
    let province = [];
    let city = [];
    let name = [];
    if (
      req.body.country != undefined &&
      req.body.country != null &&
      req.body.country.length > 0
    ) {
      country = req.body.country;
    }
    if (
      req.body.state != undefined &&
      req.body.state != null &&
      req.body.state.length > 0
    ) {
      state = req.body.state;
    }
    if (
      req.body.province != undefined &&
      req.body.province != null &&
      req.body.province.length > 0
    ) {
      province = req.body.province;
    }
    if (
      req.body.city != undefined &&
      req.body.city != null &&
      req.body.city.length > 0
    ) {
      city = req.body.state;
    }
    if (
      req.body.vendor != undefined &&
      req.body.vendor != null &&
      req.body.vendor.length > 0
    ) {
      name = req.body.vendor;
    }
    console.log(country);

    const sellers = await Seller.find({
      accCompany_id: req.companyId,
      $or: [
        { firstname: { $in: name } },
        { city: { $in: city } },
        { state: { $in: state } },
        { country: { $in: country } },
      ],
    });
    res.json(sellers);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSearch = await Seller.findById(id);
    res.json(getaSearch);
  } catch (error) {
    throw new Error(error);
  }
});

const sellerCount = asyncHandler(async (req, res) => {
  try {
    const count = await Seller.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const sellerApprovalStatus = asyncHandler(async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, {
      approve: req.body.approve,
    });
    res.json(seller);
  } catch (error) {
    throw new Error(error);
  }
});

const publicSellerList = asyncHandler(async (req, res) => {
  try {
    const sellers = await Seller.find({
      accCompany_id: req.companyId,
      approve: true,
    });
    res.json(sellers);
  } catch (error) {
    throw new Error(error);
  }
});



const getStarDoctorSellerList = async (req, res) => {
  try {
    const seller = await Seller.find({ sellerType: "65fd7f1bca55fe86cf326849", star_doctor: true })
                                 .populate(["medicine_type_id", "medical_specialty_id", "superSpecializationIds", "hos_clinic_type_id", "award", "doctor_hospital_list", "empanelment"])
                                 .lean();
    res.json(seller);
  } catch (error) {
    throw new Error(error);
  }
};


const getSellerListByTypes = async (req, res) => {
  try {
    const { sellerType } = req.query; // Assuming parameters are passed in the URL
    const { firstNameStartsWith } = req.query

    const query = { };
    if (sellerType) {
      query.sellerType = sellerType;
    }

    if (firstNameStartsWith) {
      // Use a regular expression to match the first name starting with the specified letter
      query.firstname = new RegExp(`^${firstNameStartsWith}`, 'i');
    }
    
    // if (sellerType == undefined && sellerType == '') {
    //   query.sellerType = sellerType;
    // }
    
    // if (firstNameStartsWith == undefined && firstNameStartsWith == '') {
    //   // Use a regular expression to match the first name starting with the specified letter
    //   query.firstname = new RegExp(`^${firstNameStartsWith}`, 'i');
    // }

    const { country, state, city } = req.query;
    console.log(country);
    console.log(state);
    console.log(city);
    
    if (country) {
      query.country = country;
      console.log(country);
    }
    if (state) {
      query.state = state;
      console.log(state);
    }
    if (city) {
      query.city = city;
      console.log(city);
    }

    
    
    console.log(query);
    const sellers = await Seller.find(query)
      .populate("empanelment")
      .populate({
        path: "sellerType",
        select: "seller_type category",
      })
      .populate({
        path: "staff_id",
        select: "first_name last_name",
      })
      .populate({
        path:'city',
        select: 'city_name'
      })
      .populate({
        path:'state',
        select: 'state_name'
      })
      .populate({
        path:'country',
        select: 'country_name'
      })
      .select(
        "firstname lastname hos_clinic_name sellerType parent_id staff_id createdAt"
      )
      .lean();

    if (sellers.length === 0) {
      // If no sellers found, return a proper message
      return res.status(404).json({ message: "No sellers found" });
    }

    res.json(sellers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching sellers" }); // Informative error message
  }
};

const SellerType = require("../../models/ecommerce/sellerTypeModel")

const getSellerListByCityAndPostalAndInstitution = async (req, res) => {
  try {
    const { sellerType } = req.query; // Assuming parameters are passed in the URL

    const query = {};
    if (sellerType) {
      query.sellerType = sellerType;
    }
    const validSellerType = await SellerType.findOne({ category: 'Institution' });

    if (!validSellerType) {
      return res.status(404).json({ message: "Seller type not found or not an Institution type" });
    }

    const { city, postal_code, lat, long, distance } = req.query;

    if (city) {
      query.city = city;
    }
    if (postal_code) {
      query.postal_code = postal_code;
    }
    if (lat && long && distance) {
      // Convert distance to radians (MongoDB requires distance in radians)
      const radius = parseFloat(distance) / 6371; // Earth's radius is approximately 6371 kilometers
      // Create a geospatial query to find sellers within the specified distance
      query.lat = { 
        $gte: parseFloat(lat) - (radius / 111), // Latitude range: lat - (radius / 111) to lat + (radius / 111)
        $lte: parseFloat(lat) + (radius / 111)
      };
      query.long = {
        $gte: parseFloat(long) - (radius / (111 * Math.cos(lat * (Math.PI / 180)))), // Longitude range adjusted by latitude
        $lte: parseFloat(long) + (radius / (111 * Math.cos(lat * (Math.PI / 180))))
      };
    }

    const sellers = await Seller.find(query)
      .populate("empanelment country state city")
      .populate({
        path: "sellerType",
        select: "seller_type category",
      })
      .populate({
        path: "staff_id",
        select: "first_name last_name",
      })
      .populate({
        path: "city",
        select: "city_name",
      })
      .populate({
        path: "state",
        select: "state_name",
      })
      .populate({
        path: "country",
        select: "country_name",
      })
      .select(
        "firstname lastname hos_clinic_name sellerType city state country parent_id staff_id mobile createdAt lat long" // Include lat and long fields for distance calculation
      )
      .lean();

    if (sellers.length === 0) {
      // If no sellers found, return a proper message
      return res.status(404).json({ message: "No sellers found" });
    }

    // Calculate distance for each seller and include it in the response
    const userLat = parseFloat(lat);
    const userLong = parseFloat(long);
    sellers.forEach(seller => {
      const sellerLat = parseFloat(seller.lat);
      const sellerLong = parseFloat(seller.long);
      const distanceInMeters = calculateDistance(userLat, userLong, sellerLat, sellerLong);
      seller.distanceToUser = distanceInMeters;
    });

    res.json(sellers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching sellers" }); // Informative error message
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the Earth in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
          Math.cos(phi2) *
          Math.sin(deltaLambda / 2) *
          Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

const getSellerListByCityAndPostal = async (req, res) => {
  try {
    const { sellerType } = req.params; // Assuming parameters are passed in the URL

    const query = { sellerType };
    // const query = {}
    // query['sellerType.category'] = 'Individual'
    const validSellerType = await SellerType.findOne({ category: 'Individual' });

    if (!validSellerType) {
      return res.status(404).json({ message: "Seller type not found or not an Individual type" });
    }

    const { city, postal_code  } = req.query;
    // console.log(country);
    // console.log(state);
    // console.log(city);
    // if (country) {
    //   query.country = country;
    //   console.log(country);
    // }
    // if (state) {
    //   query.state = state;
    //   console.log(state);
    // }
    
    console.log("helo")
    if (city) {
      query.city = city;
      console.log(city);
    }
    if (postal_code) {
      query.postal_code = postal_code;
    }
    console.log(query);
    const sellers = await Seller.find(query)
      .populate("empanelment")
      .populate({
        path: "sellerType",
        select: "seller_type category",
      })
      .populate({
        path: "staff_id",
        select: "first_name last_name",
      })
      .populate({
        path: "city",
        select: "city_name",
      })
      .populate({
        path: "state",
        select: "state_name",
      })
      .populate({
        path: "country",
        select: "country_name",
      })
      .select(
        "firstname lastname hos_clinic_name sellerType city state country parent_id staff_id mobile createdAt"
      )
      .lean();

    if (sellers.length === 0) {
      // If no sellers found, return a proper message
      return res.status(404).json({ message: "No sellers found" });
    }

    res.json(sellers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching sellers" }); // Informative error message
  }
};


const getSellerListByParentId = async (req, res) => {
  try {
    const sellers = await Seller.find({parent_id: req.params.parent_id})
      .populate("empanelment")
      .populate({
        path: "sellerType",
        select: "seller_type",
      })
      .populate({
        path: "staff_id",
        select: "first_name last_name",
      })
      .populate({
        path: "city",
        select: "city_name",
      })
      .populate({
        path: "state",
        select: "state_name",
      })
      .populate({
        path: "country",
        select: "country_name",
      })
      .select(
        "firstname lastname hos_clinic_name sellerType parent_id staff_id createdAt"
      )
      .lean();

    if (sellers.length === 0) {
      // If no sellers found, return a proper message
      return res.status(404).json({ message: "No sellers found" });
    }

    res.json(sellers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Error fetching sellers" }); // Informative error message
  }
};


const getDoctorSellerListByParentId = async (req, res) => {
  try {
    const parent_id  = req.params.id; // Removed .id as it's redundant

    // If parent_id is present and is of type "doctor", fetch doctors of the particular hospital
    if (parent_id) {
      const parentSeller = await Seller.findById(parent_id);
      console.log(parentSeller)
      // if (parentSeller && parentSeller.sellerType == "65fd7f1bca55fe86cf326849")
      if (parentSeller) {
        const doctors = await Seller.find({ parent_id: parent_id, sellerType: "65fd7f1bca55fe86cf326849" }).lean();
        return res.json(doctors);
      } else {
        return res.status(404).json({ message: "No related data present" });
      }
    }

    // If parent_id is not present or is not of type "doctor", fetch all sellers of the hospital
    // const sellers = await Seller.find({ sellerType: "65fd7f1bca55fe86cf326849" })
    //   .populate(["medicine_type_id", "medical_specialty_id", "superSpecializationIds", "hos_clinic_type_id", "empanelment", "country", "state", "city"])
    //   .lean();
      
    // return res.json(sellers);
  } catch (error) {
    console.error("Error fetching hospital seller list:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};






module.exports = {
  getSellerList,
  createSeller,
  updateSeller,
  deleteSeller,
  getSearchSeller,
  getSearchById,
  getSellerPaginationList,
  sellerLogin,
  updatedSeller,
  sellerCount,
  sellerApprovalStatus,
  publicSellerList,
  sortSeller,
  updateSellerProfile,
  getDoctorSellerList,
  getHospitalSellerList,
  getFavoriteHospitalSellerList,
  getFavoriteDoctorSellerList,
  toggleFavoriteStatus,
  getSingleSellerDetails,
  getSellerDetailsByTypes,
  getDoctorSellerListBySearch,
  getDoctorSellerList1,
  getStarDoctorSellerList,
  getSellerListByTypes,
  getSellerListByParentId,
  getSellerListByCityAndPostal,
  getSellerListByCityAndPostalAndInstitution,
  getDoctorSellerListByParentId
};

