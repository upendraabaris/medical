const Banner = require("../../models/ecommerce/bannerModel");
// const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");

// const cloudinary = require("../utils/cloudinary");
// const path = require("path");
// __dirname = path.resolve(path.dirname(__filename), "../");

// const Sequence = require("../models/SequenceUidMaster/bannerSequenceModel");

// const Client = require("../middlewares/redis");

// const validateMongoDbId = require("../utils/validateMongodbId");

const createBanner = (async (req, res) => {
  try {
    req.body.accCompanyId = req.user.accCompany_id;

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
    let banners = [];

    req.body.list.forEach((item) => {
      item.uid = req.body.uid;
      item.accCompany_id = req.companyId;
      banners.push(Banner.create(item));
    });

    Promise.all(banners).then(async (result) => {
      let allKeys = await Client.keys(`banner:${req.companyId}:*`);
      if(allKeys.length != 0) {
        const del = await Client.del(allKeys);
      }  
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBanner = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let bannerAuth = [];
    req.body.list.forEach((item) => {
      bannerAuth.push(Banner.findById(item._id));
    });
    Promise.all(bannerAuth)
      .then((result) => {
        let banners = [];
        req.body.list.forEach((item) => {
          banners.push(
            Banner.findOneAndUpdate({ _id: item._id, accCompany_id: req.companyId}, item, {
              new: true,
            })
          );
        });
        Promise.all(banners)
          .then(async (result) => {
            let allKeys = await Client.keys(`banner:${req.companyId}:*`);
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
const deleteBanner = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let banners = await Banner.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedBanner = [];
    banners?.forEach((item) => {
      deletedBanner.push(Banner.findByIdAndDelete(item._id));
    });
    Promise.all(deletedBanner).then(async (result) => {
      let allKeys = await Client.keys(`banner:${req.companyId}:*`);
      if(allKeys.length != 0) {
      const del = await Client.del(allKeys);
      }  
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getBanner = (async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBanner = await Banner.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json({ list: getaBanner});
  } catch (error) {
    throw new Error(error);
  }
});

const getaFeaturedBanner = (async (res) => {
  try {
    const getFeaturedBanner = await Banner.find({
      featured: 1,
      accCompany_id: req.companyId,
    });
    res.json(getFeaturedBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBanner = (async (req, res) => {
  try {
    const getallBanner = await Banner.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    res.json(getallBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBannerStatus = (async (req, res) => {
  try {
    const banner = await Banner.updateMany(
      {accCompany_id: req.companyId, uid: req.params.id },
      { approval: req.body.approval },
      { new: true }
    );
    let allKeys = await Client.keys(`banner:${req.companyId}:*`);
    if(allKeys.length != 0) {
    const del = await Client.del(allKeys);
    }  
    res.json(banner);
  } catch (error) {
    throw new Error(error);
  }
});

const publicBannerList = (async (req, res) => {
  try {
    const banner = await Client.get(`banner:${req.companyId}:${req.user.language_id}`);
    if(banner == null) {
      const allBanners = await Banner.find({
        approval: true,
        language_id: req.user.language_id,
        accCompany_id: req.companyId,
      });
      await Client.set(`banner:${req.companyId}:${req.user.language_id}`, JSON.stringify(allBanners));
      res.json(allBanners);  
    }
    else {
      res.json(JSON.parse(banner));
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanner,
  getAllBanner,
  getaFeaturedBanner,
  publicBannerList,
  updateBannerStatus,
};
