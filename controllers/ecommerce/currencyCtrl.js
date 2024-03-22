const currency = require("../models/currencyModel");
const asyncHandler = require("express-async-handler");
const Client = require("../middlewares/redis");

const getcurrencyList = asyncHandler(async (req, res) => {
  try {
    const currencys = await Client.get(`currency:${req.companyId}`);
    if(currencys == null) {
      const allcurrencys = await currency.find({ accCompany_id: req.companyId });
      await Client.set(`currency:${req.companyId}`, JSON.stringify(allcurrencys));  
      return res.json(allcurrencys);
    }
    else {
      res.json(JSON.parse(currencys));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getcurrencysById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getacurrencys = await currency.findById(id);
    return res.json(getacurrencys);
  } catch (error) {
    throw new Error(error);
  }
});

const createcurrencys = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    const currencys = await currency.create(req.body);
    await Client.del(`currency:${req.companyId}`);  
    return res.json(currencys);
  } catch (error) {
    throw new Error(error);
  }
});

const updatecurrencys = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let found = await currency.findById(id);
    if (String(found.accCompany_id) != String(req.companyId)) {
      throw new Error("Not Found");
    }
    const updatedcurrencys = await currency.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    await Client.del(`currency:${req.companyId}`);  
    return res.json(updatedcurrencys);
  } catch (error) {
    throw new Error(error);
  }
});

const deletecurrencys = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let found = await currency.findById(id);
    if (String(found.accCompany_id) != String(req.companyId)) {
      throw new Error("Not Found");
    }
    const deletedcurrencys = await currency.findByIdAndDelete(id);
    await Client.del(`currency:${req.companyId}`);  
    return res.json(deletedcurrencys);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchCurrency = asyncHandler(async (req, res) => {
  try {
    const getSearchedCurrency = await currency.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    return res.json(getSearchedCurrency);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createcurrencys,
  updatecurrencys,
  deletecurrencys,
  getcurrencyList,
  getcurrencysById,
  getSearchCurrency,
};
