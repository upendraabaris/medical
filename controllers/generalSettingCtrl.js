const GeneralSetting = require("../models/generalSettingsModel");

const Order = require("../models/ecommerce/pickupPoint_OrderModel");

// const Company = require("../models/accounts/companyModel");

// const Staff = require("../models/staffModel");
const mongoose = require("mongoose");

const Language = require("../models/languageModel");
const Currency = require("../models/currencyModel");

const Client = require("../middleware/redis");

const asyncHandler = require("express-async-handler");

const getGeneralSettingList = asyncHandler(async (req, res) => {
  try {
    const allgeneralSettings = await GeneralSetting.find();
    res.json(allgeneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getgeneralSettingsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getPrefixgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "648823db48b5950c2889e68e";
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePrefixgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64882e43c2b806ddd3050c01";
  const Id = "648823db48b5950c2889e68e";
  try {
/*     let generalSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
//    console.log(generalSettings);
//    req.body._id = undefined;
    let order = await Order.find({
      order_referenceNo:
        req.body.SalesReferencePrefix + generalSettings.referenceNo,
      accCompany_id: req.companyId,
    });
    if (order.length != 0) {
      throw new Error("This Order Reference no is already exist");
    }
 */
    const generalSetting = await GeneralSetting.findOne({
      accCompany_id: req.companyId,
      parent_id: "648823db48b5950c2889e68e"
    });
//    console.log(generalSetting);
    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      generalSetting._id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64882bf65ec65f7ca4cf04bf";
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64882bf65ec65f7ca4cf04bf";
  try {
    const getgeneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });

    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      getgeneralSettings._id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getMoneyAndNumberFormatgeneralSettingsById = asyncHandler(
  async (req, res) => {
    const id = "6488348860ba81f6c0fa3a1e";
    try {
      const getageneralSettings = await GeneralSetting.findOne({
        parent_id: id,
        accCompany_id: req.companyId,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
);

const updateMoneyAndNumberFormatgeneralSettingsById = asyncHandler(
  async (req, res) => {
    const id = "6488348860ba81f6c0fa3a1e";
    try {
      const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.json(getageneralSettings);
    } catch (error) {
      throw new Error(error);
    }
  }
);

const getSitConfiggeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "6488381f3f26992c4c3484fb";
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSitConfiggeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "6488381f3f26992c4c3484fb";
  try {
    const getgeneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });

    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      getgeneralSettings._id,
      req.body,
      { new: true }
    );
    await Client.del(`GeneralSetting:${req.companyId}:6488381f3f26992c4c3484fb`);
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getSalegeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64882e43c2b806ddd3050c01";
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSalegeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64882e43c2b806ddd3050c01";
  try {
    let generalSetting = await GeneralSetting.findOne(
      {
        parent_id: "648823db48b5950c2889e68e",
        accCompany_id: req.companyId,
      }      
    );
    let order = await Order.find({
      order_referenceNo:
        generalSetting.SalesReferencePrefix + req.body.referenceNo,
    });
    if (order.length != 0) {
      throw new Error("This Order Reference no is already exist");
    }

    const generalSettings = await GeneralSetting.findOne({
      accCompany_id: req.companyId,
      parent_id: id
    });
    console.log(generalSettings);

    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      generalSettings._id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getWeightSalegeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64895f4fa0e9dab277ff582d";
  try {
    console.log(id, req.companyId);
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateWeightSalegeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64895f4fa0e9dab277ff582d";
  try {
    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getEmailgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64895fdaa9aa3f90d10cb7be";
  try {
    const getageneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateEmailgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64895fdaa9aa3f90d10cb7be";
  try {
    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const getAwardPointsgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64896054c5d349de7d1155d0";
  try {
    const getgeneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const updateAwardPointsgeneralSettingsById = asyncHandler(async (req, res) => {
  const id = "64896054c5d349de7d1155d0";
  try {
    const getgeneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });

    const getageneralSettings = await GeneralSetting.findByIdAndUpdate(
      getgeneralSettings._id,
      req.body,
      { new: true }
    );
    res.json(getageneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

const creategeneralSettings = asyncHandler(async (req, res) => {
  try {
    const generalSettings = await GeneralSetting.find({
      accCompany_id: "64f83adff7575ad13806c747",
    });

    let generalSettingMasters = [];
    generalSettings.forEach(async (generalSetting) => {
      generalSetting.parent_id = generalSetting._id;
      if (String(generalSetting._id) == "6488381f3f26992c4c3484fb") {
        generalSettingMasters.push(
          GeneralSetting.create({
            accCompany_id: req.body.accCompany_id,
            parent_id: generalSetting.parent_id,
            Language: req.body.Language,
            Country: req.body.Country,
            Currency: req.body.Currency,
          })
        );
      }

      generalSettingMasters.push(
        GeneralSetting.create({
          accCompany_id: req.body.accCompany_id,
          parent_id: generalSetting.parent_id,
        })
      );
    });

    Promise.all(generalSettingMasters).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updategeneralSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getgeneralSettings = await GeneralSetting.findOne({
      parent_id: id,
      accCompany_id: req.companyId,
    });

    const updatedgeneralSettings = await GeneralSetting.findByIdAndUpdate(
      getgeneralSettings._id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedGeneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});
const deletegeneralSettings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedgeneralSettings = await GeneralSettings.findByIdAndDelete(id);
    res.json(deletedgeneralSettings);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  creategeneralSettings,
  updategeneralSettings,
  deletegeneralSettings,
  getGeneralSettingList,
  getgeneralSettingsById,
  getPrefixgeneralSettingsById,
  updatePrefixgeneralSettingsById,
  getProductgeneralSettingsById,
  updateProductgeneralSettingsById,
  getMoneyAndNumberFormatgeneralSettingsById,
  updateMoneyAndNumberFormatgeneralSettingsById,
  getSitConfiggeneralSettingsById,
  updateSitConfiggeneralSettingsById,
  getSalegeneralSettingsById,
  updateSalegeneralSettingsById,
  getAwardPointsgeneralSettingsById,
  updateAwardPointsgeneralSettingsById,
  getEmailgeneralSettingsById,
  updateEmailgeneralSettingsById,
  getWeightSalegeneralSettingsById,
  updateWeightSalegeneralSettingsById,
};
