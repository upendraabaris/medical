const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
__dirname = path.resolve(path.dirname(__filename), "../");


const getCouponList = asyncHandler(async (req, res) => {
  try {    
    const allCoupons = await Coupon.find({ accCompany_id: req.companyId });
    res.json(allCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getCouponListForUser = asyncHandler(async (req, res) => {
  try {
    let getAllCoupons = await Coupon.find({ accCompany_id: req.companyId });
    if (getAllCoupons.length != 0) {
      const currentDate = new Date();
      getAllCoupons = getAllCoupons.filter((coupon) => {
        if (
          currentDate - coupon.start_date > 0 &&
          coupon.end_date - currentDate > 0
        ) {
          return coupon;
        }
      });
    }
    res.json(getAllCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getCouponsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaCoupons = await Coupon.findOne({ _id: id, accCompany_id: req.companyId}).lean();
    let date = getaCoupons?.start_date?.getDate();
    let date1 = getaCoupons?.end_date?.getDate();
    let month = getaCoupons?.start_date?.getMonth();
    let month1 = getaCoupons?.end_date?.getMonth();
    let year = getaCoupons?.start_date?.getYear();
    let year1 = getaCoupons?.end_date?.getYear();
    getaCoupons.start_date = date + "/" + month + "/" + year;
    getaCoupons.end_date = date1 + "/" + month1 + "/" + year1;

    res.json(getaCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const createCoupons = asyncHandler(async (req, res) => {
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
      req.body.icon = image;
    }
  
    let found = await Coupon.findOne({ accCompany_id: req.companyId, code: req.body.code });
    if(found!= null) {
      throw new Error("Coupon Code already Exist!");
    }
    req.body.accCompany_id = req.companyId;
    const coupons = await Coupon.create(req.body);
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCoupons = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupons);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedCoupons = await Coupon.findByIdAndDelete(id);
    res.json(deletedCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCoupons = asyncHandler(async (req, res) => {
  try {
    const getSearchedCoupons = await Coupon.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getCouponCount = asyncHandler(async (req, res) => {
  try {
    const count = await Coupon.find({ accCompany_id: req.companyId }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const getActiveCouponCount = asyncHandler(async (req, res) => {
  try {
    const count = await Coupon.find({
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      accCompany_id: req.companyId
    }).count();
    res.json(
      {
        response: {
          status: 200,
          message: "success"
        },
        data: count
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

const getActiveCouponList = asyncHandler(async (req, res) => {
  try {
    const count = await Coupon.find({
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      accCompany_id: req.companyId
    });
    res.json(
      {
        response: {
          status: 200,
          message: "success"
        },
        data: count
      }
    );
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getCouponList,
  getCouponsById,
  getSearchCoupons,
  updateCoupons,
  createCoupons,
  deleteCoupons,
  getCouponListForUser,
  getCouponCount,
  getActiveCouponCount,
  getActiveCouponList,

};
