const Brand = require("../../models/ecommerce/brandModel");
const asyncHandler = require("express-async-handler");
// const validateMongoDbId = require("../utils/validateMongodbId");
// const cloudinary = require("../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");
// const Sequence = require("../models/SequenceUidMaster/brandSequenceModel");
const Sequence = require("../../models/ecommerce/SequenceUidMaster/bannerSequenceModel");

const Client = require("../../middleware/redis");

const createBrand = asyncHandler(async (req, res) => {
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
      item.uid = req.body.uid;
      item.accCompany_id = req.companyId;
      attributes.push(Brand.create(item));
    });

    Promise.all(attributes).then(async (result) => {
      let allKeys = await Client.keys(`*:brand:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let brandAuth = [];
    req.body.list.forEach((item) => {
      brandAuth.push(Brand.findById(item._id));
    });
    Promise.all(brandAuth)
      .then((result) => {
        let brands = [];
        result.forEach((item) => {
          if (String(item.accCompany_id) != String(req.companyId)) {
            throw new Error(
              "Either you are not Authorize or something went wrong!"
            );
          }
        });
        req.body.list.forEach((item) => {
          brands.push(
            Brand.findByIdAndUpdate(item._id, item, {
              new: true,
            })
          );
        });
        Promise.all(brands)
          .then(async (result) => {
            let allKeys = await Client.keys(`*:brand:${req.companyId}:*`);
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

const deleteBrand = asyncHandler(async (req, res) => {
  const  id  = req.params.id;
  // validateMongoDbId(id);
  try {
    let brands = await Brand.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedBrand = [];
    brands?.forEach((item) => {
      deletedBrand.push(Brand.findByIdAndDelete(item._id));
    });
    Promise.all(deletedBrand).then(async (result) => {
      let allKeys = await Client.keys(`*:brand:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBrand = await Brand.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrandPublicList = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const brands = await Client.get(`getBrandPublicList:brand:${req.companyId}:${req.user.language_id}`);
    if(brands == null) {
    const getaBrand = await Brand.find({
      active: true,
      accCompany_id: req.companyId,
      language_id: req.user.language_id
    });
    await Client.set(`brand:${req.companyId}:${req.user.language_id}`, JSON.stringify(getaBrand));
    res.json(getaBrand);
  }
  else {
    res.json(JSON.parse(brands));
  }
  } catch (error) {
    throw new Error(error);
  }
});

const getallBrand = asyncHandler(async (req, res) => {
  try {
    // if(req.type == "Staff" || req.type == "Seller") {
    const getallBrand = await Brand.find({
      // accCompany_id: req.companyId,
      // language_id: req.user.language_id,
    });
    res.json(getallBrand);
    // }
    // else {
    //   throw new Error("You are not Authorize");
    // }
    // res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBrandByLang = asyncHandler(async (req, res) => {
  try {
    const getallBrand = await Brand.find({
      accCompany_id: req.companyId,
      language_id: req.params.id,
    });
    res.json(getallBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getSearchBrand = asyncHandler(async (req, res) => {
  try {
    const getSearchedBrand = await Brand.find({
      $text: { $search: req.params.search, $diacriticSensitive: true },
      accCompany_id: req.companyId,
    });
    res.json(getSearchedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const brandCount = asyncHandler(async (req, res) => {
  try {
    const count = await Brand.find({ accCompany_id: req.companyId, language_id: req.user.language_id }).count();
    res.json({ count: count });
  } catch (error) {
    throw new Error(error);
  }
});

const brandUpdateStatus = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate({ uid: req.params.id, accCompany_id: req.companyId}, {
      active: req.body.active,
      accCompany_id: req.companyId,
    });
    let allKeys = await Client.keys(`*:brand:${req.companyId}:*`);
    if(allKeys.length != 0) {
    const del = await Client.del(allKeys);
    }  

    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
  getallBrandByLang,
  getSearchBrand,
  brandCount,
  getBrandPublicList,
  brandUpdateStatus,
};
