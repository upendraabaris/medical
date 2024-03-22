const asyncHandler = require("express-async-handler");
const PickupPoints = require("../models/pickupPointsModel");
const Sequence = require("../models/pickupPointSequenceModel");

const getPickupPointsList = asyncHandler(async (req, res) => {
  try {
    const getPickupPoints = await PickupPoints.find({
      accCompany_id: req.companyId,
    }).populate("pickUpManagerSchema");
    res.json(getPickupPoints);
  } catch (error) {
    throw new Error(error);
  }
});

const getPickupPointsListByLang = asyncHandler(async (req, res) => {
  try {
    const getPickupPoints = await PickupPoints.find({
      accCompany_id: req.companyId,
    });
    res.json(getPickupPoints);
  } catch (error) {
    throw new Error(error);
  }
});

const createPickupPoints = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    const pickupPoints = await PickupPoints.create(req.body);
    res.json(pickupPoints);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePickupPoints = asyncHandler(async (req, res) => {
  try {
    const pickupPoint = await PickupPoints.findOne({ accCompany_id: req.companyId, _id: req.params.id });
    if(pickupPoint == null) {
      throw new Error("You are not Authorize to update this pickupPoint");
    }
    else {
      let pickup = await PickupPoints.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(pickup);
    }

  } catch (error) {
    throw new Error(error);
  }
});

const deletePickupPoints = asyncHandler(async (req, res) => {
  try {
    let categories = await PickupPoints.findOne({
      accCompany_id: req.companyId,
      _id: req.params.id
    });
    if(categories == null) {
      throw new Error("You are not Authorize!");
    }
    else {
      let pickup = await PickupPoints.findByIdAndDelete(item._id);
      res.json(pickup);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdPickupPoints = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getPickupPoints = await PickupPoints.find({
//      accCompany_id: req.companyId,
      _id: id,
    });
    res.json(getPickupPoints);
  } catch (error) {
    throw new Error(error);
  }
});

const pickupPointsCount = asyncHandler(async (req, res) => {
  try {
    const getPickupPoint = await PickupPoints.find({ accCompany_id: req.companyId }).count();
    res.json({ count: getPickupPoint });
  }
  catch(error) {
    throw new Error(error);
  }
});

const getallPickupPointsPagination = asyncHandler(async (req, res) => {
  const getPickup = await PickupPoints.find({ accCompany_id: req.companyId }).skip(req.params.page * 10).limit(10);
  res.json(getPickup);
});

const pickupPointsListForStaff = asyncHandler(async (req, res) => {
  try {
    const getPickup = await PickupPoints.find({ pickUpManagerSchema: req.params.id, accCompany_id: req.companyId });
    res.json(getPickup);
  }
  catch(error) {
    throw new Error(error);
  }
})


module.exports = {
  getPickupPointsList,
  getPickupPointsListByLang,
  getByIdPickupPoints,
  createPickupPoints,
  updatePickupPoints,
  deletePickupPoints,
  pickupPointsCount,
  getallPickupPointsPagination,
  pickupPointsListForStaff
};
