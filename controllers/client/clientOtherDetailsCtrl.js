// const asyncHandler = require("express-async-handler");
const ClientOther = require("../../models/client/clientOtherDetailsModel");

const getClientOtherList = (async (req, res) => {
  try {
    const getClientOther = await ClientOther.find();
    res.json(getClientOther);
  } catch (error) {
    throw new Error(error);
  }
});

const createClientOther = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await ClientOther.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientOther.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientOther = await ClientOther.create(req.body);
      res.json(getClientOther);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createClientOtherAdmin = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await ClientOther.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await ClientOther.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getClientOther = await ClientOther.create(req.body);
      res.json(getClientOther);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateClientOther = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getClientOther = await ClientOther.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(getClientOther);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteClientOther = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientOther = await ClientOther.findByIdAndDelete(id);
    res.json(getClientOther);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdClientOther = (async (req, res) => {
  try {
    const id = req.user._id;
    const getClientOther = await ClientOther.findOne({ user_id: id });
    res.json(getClientOther);
  } catch (error) {
    throw new Error(error);
  }
});

const getByUserIdClientOther = (async (req, res) => {
  try {
    const id = req.params.id;
    const getClientOther = await ClientOther.findOne({ user_id: id });
    res.json(getClientOther);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClientOtherList,
  getByIdClientOther,
  getByUserIdClientOther,
  createClientOther,
  createClientOtherAdmin,
  updateClientOther,
  deleteClientOther,
};
