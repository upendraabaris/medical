const SellerCoupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");

const getSellerCouponList = asyncHandler(async (req, res) => {
  try {
    const allSellerCoupons = await SellerCoupon.find({userid: req.params.id});
    res.json(allSellerCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getSellerCouponsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSellerCoupons = await SellerCoupon.findById(id);
    res.json(getaSellerCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const createSellerCoupons = asyncHandler(async (req, res) => {
  try {
    const Sellercoupons = await SellerCoupon.create(req.body);
    res.json(Sellercoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSellerCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSellerCoupons = await SellerCoupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSellerCoupons);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSellerCoupons = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSellerCoupons = await SellerCoupon.findByIdAndDelete(id);
    res.json(deletedSellerCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchSellerCoupons = asyncHandler(async (req, res) => {
  try {
    const getSearchedSellerCoupons = await SellerCoupon.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedSellerCoupons);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSellerCouponList,
  getSellerCouponsById,
  getSearchSellerCoupons,
  updateSellerCoupons,
  createSellerCoupons,
  deleteSellerCoupons,
};
