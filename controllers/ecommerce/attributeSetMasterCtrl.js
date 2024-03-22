const attributeSetMaster = require("../../models/ecommerce/attributeSetMasterModel");
const asyncHandler = require("express-async-handler");
const Category = require("../../models/ecommerce/prodcategoryModel");
const mongoose = require("mongoose");

const Sequence = require("../../models/ecommerce/SequenceUidMaster/attributeSetSequenceModel");

const getattributeSetMasterList = asyncHandler(async (req, res) => {
  try {
    if(req.type == "Staff" || req.type == "Seller") {
      const allattributeSetMasters = await attributeSetMaster
        .find({ accCompany_id: req.companyId, language_id: req.user.language_id })
        .populate("values");
      res.json(allattributeSetMasters);
    }
    else {
      throw new Error("You are not Authorize!");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getattributeSetMasterListByLang = asyncHandler(async (req, res) => {
  try {
    const allattributeSetMasters = await attributeSetMaster
      .find({ accCompany_id: req.companyId, language_id: req.params.id })
      .populate("values");
    res.json(allattributeSetMasters);
  } catch (error) {
    throw new Error(error);
  }
});

const createattributeSetMaster = asyncHandler(async (req, res) => {
  try {
    let sequence = await Sequence.findOne({
      accCompany_id: req.companyId,
    });

    if (sequence == null) {
      sequence = await Sequence.create({
        accCompany_id: req.companyId,
        sequence: 0,
      });
    }

    let seq = await Sequence.findByIdAndUpdate(
      sequence._id,
      {
        $inc: { sequence: 1 },
      },
      { new: true }
    );

    req.body.uid = seq.sequence;
    let attributes = [];

    req.body.list.forEach((item) => {
      item.uid = req.body.uid;
      item.accCompany_id = req.companyId;
      attributes.push(attributeSetMaster.create(item));
    });

    Promise.all(attributes).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateattributeSetMaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let attributeAuth = [];
    req.body.list.forEach((item) => {
      attributeAuth.push(attributeSetMaster.findById(item._id));
    });
    Promise.all(attributeAuth)
      .then((result) => {
        let attributes = [];
        result.forEach((item) => {
          if (String(item.accCompany_id) != String(req.companyId)) {
            throw new Error(
              "Either you are not Authorize or something went wrong!"
            );
          }
        });
        req.body.list.forEach((item) => {
          attributes.push(
            attributeSetMaster.findByIdAndUpdate(item._id, item, {
              new: true,
            })
          );
        });
        Promise.all(attributes)
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
});


const deleteattributeSetMaster = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let attributes = await attributeSetMaster.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedattribute = [];
    attributes?.forEach((item) => {
      deletedattribute.push(attributeSetMaster.findByIdAndDelete(item._id));
    });
    Promise.all(deletedattribute).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchattributeSetMaster = asyncHandler(async (req, res) => {
  try {
    const getSearchedattributeSetMaster = await attributeSetMaster.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    res.json(getSearchedattributeSetMaster);
  } catch (error) {
    throw new Error(error);
  }
});

const getattributeSetMasterById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSearch = await attributeSetMaster.find({
      accCompany_id: req.companyId,
      uid: id,
    }).populate("values language_id");
    res.json(getaSearch);
  } catch (error) {
    throw new Error(error);
  }
});

const attributeSetMasterCount = asyncHandler(async (req, res) => {
  try {
    const count = await attributeSetMaster
      .find({ accCompany_id: req.companyId })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const attributeSetMasterSelectByCateg = asyncHandler(async (req, res) => {
  try {
    let categ = [];
    req.body.id?.forEach((id) => {
      categ.push(new mongoose.Types.ObjectId(id));
    });
    const attributesSet = await attributeSetMaster.aggregate([
      {
        $match: {
          _id: {
            $in: categ,
          },
        },
      },
      {
        $unwind: "$values",
      },
      {
        $project: {
          _id: "$values",
          attributeMaster: "$$ROOT",
        },
      },
      {
        $lookup: {
          from: "attributes",
          localField: "_id",
          foreignField: "_id",
          as: "attribute",
        },
      },
      {
        $unwind: "$attribute",
      },
      {
        $group: {
          _id: "$attributeMaster._id",
          attributeSetMaster: { $first: "$attributeMaster" },
          list: { $push: { attribute: "$attribute" } },
        },
      },
    ]);
    res.json(attributesSet);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getattributeSetMasterList,
  getattributeSetMasterListByLang,
  createattributeSetMaster,
  updateattributeSetMaster,
  deleteattributeSetMaster,
  getSearchattributeSetMaster,
  getattributeSetMasterById,
  attributeSetMasterCount,
  attributeSetMasterSelectByCateg,
};
