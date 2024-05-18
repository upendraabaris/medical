const PaymentStatusMaster = require("../../models/ecommerce/paymentStatusMasterModel");
const asyncHandler = require("express-async-handler");

const getPaymentStatusMasterList = asyncHandler(async (req, res) => {
  try {
    const allPaymentStatusMasters = await PaymentStatusMaster.find();
    res.json(allPaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});

const createPaymentStatusMasters = asyncHandler(async (req, res) => {
  try {
    const PaymentStatusMasters = await PaymentStatusMaster.create(req.body);
    res.json(PaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePaymentStatusMasters = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedPaymentStatusMasters = await PaymentStatusMaster.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePaymentStatusMasters = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPaymentStatusMasters = await PaymentStatusMaster.findByIdAndDelete(id);
    res.json(deletedPaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchPaymentStatusMasters = asyncHandler(async (req, res) => {
  try {
    const getSearchedPaymentStatusMasters = await PaymentStatusMaster.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
    });
    res.json(getSearchedPaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});

const getPaymentStatusMastersById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPaymentStatusMasters = await PaymentStatusMaster.findById(id);
    res.json(getaPaymentStatusMasters);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPaymentStatusMasterList,
  createPaymentStatusMasters,
  updatePaymentStatusMasters,
  deletePaymentStatusMasters,
  getPaymentStatusMastersById,
  getSearchPaymentStatusMasters,
};
