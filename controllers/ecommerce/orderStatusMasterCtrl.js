const orderStatusMaster = require("../../models/ecommerce/orderStatusMasterModel");
const asyncHandler = require("express-async-handler");

const getorderStatusMasterList = asyncHandler(async (req, res) => {
  try {
    const allorderStatusMasters = await orderStatusMaster
      .find()
      .sort({ Sno: 1 });
    res.json(allorderStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});

const getorderStatusMasterListForDeliveryBoy = asyncHandler(
  async (req, res) => {
    try {
      const allorderStatusMasters = await orderStatusMaster
        .find({ deliveryBoyActive: true })
        .sort({ Sno: 1 });
      res.json(allorderStatusMasters);
    } catch (error) {
      throw new Error(error);
    }
  }
);

const getorderStatusMasterById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaorderStatusMaster = await orderStatusMaster.findById(id);
    res.json(getaorderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const createorderStatusMaster = asyncHandler(async (req, res) => {
  try {
    const OrderStatusMaster = await orderStatusMaster.create(req.body);
    res.json(OrderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const updateorderStatusMaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedorderStatusMaster = await orderStatusMaster.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedorderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const updateorderDeliveryStatusMaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedorderStatusMaster = await orderStatusMaster.findByIdAndUpdate(
      id,
      { deliveryBoyActive: req.body.deliveryBoyActive },
      {
        new: true,
      }
    );
    res.json(updatedorderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteorderStatusMaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedorderStatusMaster = await orderStatusMaster.findByIdAndDelete(
      id
    );
    res.json(deletedorderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchorderStatusMaster = asyncHandler(async (req, res) => {
  try {
    const getSearchedorderStatusMaster = await orderStatusMaster.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedorderStatusMaster);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getorderStatusMasterList,
  getorderStatusMasterById,
  getSearchorderStatusMaster,
  createorderStatusMaster,
  updateorderStatusMaster,
  deleteorderStatusMaster,
  updateorderDeliveryStatusMaster,
  getorderStatusMasterListForDeliveryBoy,
};
