const Banner = require("../../models/ecommerce/bannerSellerModel");
const asyncHandler = require("express-async-handler");
// const slugify = require("slugify");

// const cloudinary = require("../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");

// const validateMongoDbId = require("../utils/validateMongodbId");

const createBanner = asyncHandler(async (req, res) => {
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
    }
    req.body.image = image;
    const categories = await Banner.create(req.body);
    res.json(categories);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    let image;
    if (req.file != undefined) {
      image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename
      );
      req.body.image = image;
      const categ = await Banner.findById(id);
      await cloudinary
        .cloudinaryDeleteImg(categ?.image?.public_id)
        .then((result) => {});
      const updatedBrand = await Banner.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedBrand);
    } else {
      const updatedBrand = await Banner.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedBrand);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedBanner = await Banner.findByIdAndDelete(id);
    res.json(deletedBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBanner = await Banner.findById(id);
    res.json(getaBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getaFeaturedBanner = asyncHandler(async (res) => {
  try {
    const getFeaturedBanner = await Banner.find({ featured: 1 });
    res.json(getFeaturedBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBanner = asyncHandler(async (req, res) => {
  try {
    const getallBanner = await Banner.find();
    res.json(getallBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBannerStatus = asyncHandler(async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { approval: req.body.approval },
      { new: true }
    );
    res.json(banner);
  } catch (error) {
    throw new Error(error);
  }
});

const publicBannerList = asyncHandler(async (req, res) => {
  try {
    const allBanners = await Banner.find({ approval: true });
    res.json(allBanners);
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
