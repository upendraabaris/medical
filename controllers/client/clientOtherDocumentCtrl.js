// const asyncHandler = require("express-async-handler");
const OtherDocument = require("../../models/client/clientOtherDocumentModel");

const getOtherDocumentList = (async (req, res) => {
  try {
    const getOtherDocument = await OtherDocument.find();
    res.json(getOtherDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const createOtherDocument = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    let found = await OtherDocument.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await OtherDocument.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getOtherDocument = await OtherDocument.create(req.body);
      res.json(getOtherDocument);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createOtherDocumentAdmin = (async (req, res) => {
  try {
    let found = await OtherDocument.findOne({ user_id: req.body.user_id });
    if (found != null) {
      const getClientBasic = await OtherDocument.findByIdAndUpdate(
        found._id,
        req.body,
        {
          new: true,
        }
      );
      res.json(getClientBasic);
    } else {
      const getOtherDocument = await OtherDocument.create(req.body);
      res.json(getOtherDocument);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateOtherDocument = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getOtherDocument = await OtherDocument.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getOtherDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOtherDocument = (async (req, res) => {
  try {
    const { id } = req.params;
    const getOtherDocument = await OtherDocument.findByIdAndDelete(id);
    res.json(getOtherDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdOtherDocument = (async (req, res) => {
  try {
    const id = req.user._id;
    const getOtherDocument = await OtherDocument.findOne({ user_id: id });
    res.json(getOtherDocument);
  } catch (error) {
    throw new Error(error);
  }
});

const getByUserIdOtherDocument = (async (req, res) => {
  try {
    const id = req.params.id;
    const getOtherDocument = await OtherDocument.findOne({ user_id: id });
    res.json(getOtherDocument);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getOtherDocumentList,
  getByIdOtherDocument,
  getByUserIdOtherDocument,
  createOtherDocument,
  createOtherDocumentAdmin,
  updateOtherDocument,
  deleteOtherDocument,
};
