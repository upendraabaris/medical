const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../");


const addImage = asyncHandler(async (req, res) => {
  try {
      const image = await cloudinary.cloudinaryUploadImg(
        __dirname + "/uploads/" + req.file.filename,
        req.companyId
      );
      if(image.url == undefined || image.url == null) {
        throw new Error(JSON.stringify(image));
      }
      res.json(image);    
    } catch (error) {
    throw new Error(error);
  }
});

  module.exports = {
  addImage,
};
