const ProductCostVariation = require("../../models/ecommerce/productCostVariationModel");
const Seller = require("../../models/ecommerce/sellersModel");
const asyncHandler = require("express-async-handler");
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
          token: generateToken({ id: findSeller?._id, type: "Seller" }),
          findSeller,
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

const getSellerList = asyncHandler(async (req, res) => {
  try {
    const allSellers = await Seller.find({ accCompany_id: req.companyId })
      .populate("user_id")
      .sort({ createdAt: -1 });
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

    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
    }
    req.body.profilePhoto = image;
    if(String(req.companyId) == "65704962662a1b5b3deba16a" && req.body.sellerType == undefined) {
      req.body.sellerType = "6572f517ca6e2f0164a813a1"
    }
    const sellers = await Seller.create(req.body);
    res.json(sellers);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;
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

      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json(updatedSeller);
    } else {
      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedSeller);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateSellerProfile = asyncHandler(async (req, res) => {
  const  id  = req.user._id;
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

      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.json(updatedSeller);
    } else {
      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedSeller);
    }
  } catch (error) {
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
      res.json(deletedSeller);
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
  updateSellerProfile
};

