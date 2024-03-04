const attribute = require("../../models/ecommerce/attributeModel");
// const asyncHandler = require("express-async-handler");
// const Sequence = require("../models/SequenceUidMaster/attributeSequneceModel");
// const Client = require("../middlewares/redis");

const getattributeList = (async (req, res) => {
  try {
    if(req.type == "Staff" || req.type == "Seller") {
      const attributeCache = await Client.get(`getattributeList:attribute:${req.companyId}:${req.user.language_id}`);
      if(attributeCache == null) {
        const allattributes = await attribute.find({
          accCompany_id: req.companyId,
          language_id: req.user.language_id,
        });
        await Client.set(`getattributeList:attribute:${req.companyId}:${req.user.language_id}`, JSON.stringify(allattributes));
        res.json(allattributes);  
      }
      else {
        res.json(JSON.parse(attributeCache));
      }
    }
    else {
      throw new Error("You are not Authorize");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getattributeListByLang = (async (req, res) => {
  try {
    const attributeCache = await Client.get(`getattributeList:attribute:${req.companyId}:${req.user.language_id}`);
    if(attributeCache == null) {
      const allattributes = await attribute.find({
        accCompany_id: req.companyId,
        language_id: req.params.id,
      });
      await Client.set(`getattributeList:attribute:${req.companyId}:${req.user.language_id}`, JSON.stringify(allattributes));
      res.json(allattributes);  
    }
    else {
      res.json(JSON.parse(attributeCache));
    }
  } catch (error) {
    throw new Error(error);
  }
});

const createattribute = (async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;

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
      item.accCompany_id = req.companyId;
      item.uid = req.body.uid;
      attributes.push(attribute.create(item));
    });

    Promise.all(attributes).then(async (result) => {
      let allKeys = await Client.keys(`*:attribute:${req.companyId}:*`);
      if(allKeys.length != 0) {
        const del = await Client.del(allKeys);
      }        

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateattribute = (async (req, res) => {
  const { id } = req.params;
  try {
    let attributeAuth = [];
    req.body.list.forEach((item) => {
      attributeAuth.push(attribute.findById(item._id));
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
            attribute.findByIdAndUpdate(item._id, item, {
              new: true,
            })
          );
        });
        Promise.all(attributes)
          .then(async (result) => {
            let allKeys = await Client.keys(`*:attribute:${req.companyId}:*`);
            if(allKeys.length != 0) {
              const del = await Client.del(allKeys);
            }              
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

const deleteattribute = (async (req, res) => {
  const { id } = req.params;
  try {
    let attributes = await attribute.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedattribute = [];
    attributes?.forEach((item) => {
      deletedattribute.push(attribute.findByIdAndDelete(item._id));
    });
    Promise.all(deletedattribute).then(async (result) => {
      let allKeys = await Client.keys(`*:attribute:${req.companyId}:*`);
      if(allKeys.length != 0) {
        const del = await Client.del(allKeys);
      }        

      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchattribute = (async (req, res) => {
  try {
    const getSearchedattribute = await attribute.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    res.json(getSearchedattribute);
  } catch (error) {
    throw new Error(error);
  }
});

const getattributeById = (async (req, res) => {
  const { id } = req.params;
  try {
    const getaSearch = await attribute.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getaSearch);
  } catch (error) {
    throw new Error(error);
  }
});

const attributeCount = (async (req, res) => {
  try {
    const count = await attribute
      .find({ accCompany_id: req.companyId })
      .count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getattributeList,
  getattributeListByLang,
  createattribute,
  updateattribute,
  deleteattribute,
  getSearchattribute,
  getattributeById,
  attributeCount,
};
