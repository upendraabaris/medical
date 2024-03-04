// const asyncHandler = require("express-async-handler");
const ClientBasic = require("../../models/client/clientBasicDetailsModel");

const getClientBasicList = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const getClientBasic = await ClientBasic.find();
    res.json(getClientBasic);
  } catch (error) {
    throw new Error(error);
  }
});

const createClientBasic = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await ClientBasic.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientBasic.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientBasic = await ClientBasic.create(req.body);
      res.json(getClientBasic);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createClientBasicAdmin = (async (req, res) => {
  try {
    let found = await ClientBasic.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientBasic.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientBasic = await ClientBasic.create(req.body);
      res.json(getClientBasic);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateClientBasic = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getClientBasic = await ClientBasic.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(getClientBasic);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteClientBasic = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientBasic = await ClientBasic.findByIdAndDelete(id);
    res.json(getClientBasic);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdClientBasic = (async (req, res) => {
  try {
    const id = req.user._id;
    const getClientBasic = await ClientBasic.findOne({ user_id: id });
    res.json(getClientBasic);
  } catch (error) {
    throw new Error(error);
  }
});

const getByUserIdClientBasic = (async (req, res) => {
  try {
    const id = req.params.id;
    const getClientBasic = await ClientBasic.findOne({ user_id: id });
    res.json(getClientBasic);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClientBasicList,
  getByIdClientBasic,
  createClientBasic,
  createClientBasicAdmin,
  updateClientBasic,
  deleteClientBasic,
  getByUserIdClientBasic
};
