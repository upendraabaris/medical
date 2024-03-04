// const asyncHandler = require("express-async-handler");
const ClientCarriculam = require("../../models/client/clientCarriculamModel");

const getClientCarriculamList = (async (req, res) => {
  try {
    const getClientCarriculam = await ClientCarriculam.find();
    res.json(getClientCarriculam);
  } catch (error) {
    throw new Error(error);
  }
});

const createClientCarriculam = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await ClientCarriculam.findOne({user_id: req.body.user_id});
    if (found != null) {
      const getClientBasic = await ClientCarriculam.findByIdAndUpdate(found._id, req.body, {
        new: true,
      });
      res.json(getClientBasic);
    } else {
      const getClientCarriculam = await ClientCarriculam.create(req.body);
      res.json(getClientCarriculam);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createClientCarriculamAdmin = (async (req, res) => {
  try {
    let found = await ClientCarriculam.findOne({user_id: req.body.user_id});
    if (found != null) {
      const getClientBasic = await ClientCarriculam.findByIdAndUpdate(found._id, req.body, {
        new: true,
      });
      res.json(getClientBasic);
    } else {
      const getClientCarriculam = await ClientCarriculam.create(req.body);
      res.json(getClientCarriculam);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateClientCarriculam = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getClientCarriculam = await ClientCarriculam.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getClientCarriculam);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteClientCarriculam = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientCarriculam = await ClientCarriculam.findByIdAndDelete(id);
    res.json(getClientCarriculam);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdClientCarriculam = (async (req, res) => {
  try {
    const  id  = req.user._id;
    const getClientCarriculam = await ClientCarriculam.findOne({ user_id: id });
    res.json(getClientCarriculam);
  } catch (error) {
    throw new Error(error);
  }
});

const getByUserIdClientCarriculam = (async (req, res) => {
  try {
    const  id  = req.params.id;
    const getClientCarriculam = await ClientCarriculam.findOne({ user_id: id });
    res.json(getClientCarriculam);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClientCarriculamList,
  getByIdClientCarriculam,
  getByUserIdClientCarriculam,
  createClientCarriculam,
  createClientCarriculamAdmin,
  updateClientCarriculam,
  deleteClientCarriculam,
};
