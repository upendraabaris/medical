// const asyncHandler = require("express-async-handler");
const ClientElegibility = require("../../models/client/clientPhysicalElegibilityModel");

const getClientElegibilityList = (async (req, res) => {
  try {
    const getClientElegibility = await ClientElegibility.find();
    res.json(getClientElegibility);
  } catch (error) {
    throw new Error(error);
  }
});

const createClientElegibility = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await ClientElegibility.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientElegibility.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientElegibility = await ClientElegibility.create(req.body);
      res.json(getClientElegibility);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createClientElegibilityAdmin = (async (req, res) => {
  try {
    let found = await ClientElegibility.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientElegibility.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientElegibility = await ClientElegibility.create(req.body);
      res.json(getClientElegibility);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateClientElegibility = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getClientElegibility = await ClientElegibility.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getClientElegibility);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteClientElegibility = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientElegibility = await ClientElegibility.findByIdAndDelete(id);
    res.json(getClientElegibility);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdClientElegibility = (async (req, res) => {
  try {
    const id = req.user._id;
    const getClientElegibility = await ClientElegibility.findOne({
      user_id: id,
    });
    res.json(getClientElegibility);
  } catch (error) {
    throw new Error(error);
  }
});

const getByUserIdClientElegibility = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientElegibility = await ClientElegibility.findOne({
      user_id: id,
    });
    res.json(getClientElegibility);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClientElegibilityList,
  getByIdClientElegibility,
  getByUserIdClientElegibility,
  createClientElegibility,
  createClientElegibilityAdmin,
  updateClientElegibility,
  deleteClientElegibility,
};
