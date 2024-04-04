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



const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

//const pdf2img = require('pdf-img-convert');
//const pdf = require('pdf-poppler');


const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// const path = require("path");
const fs = require("fs");

async function putObjectUrl(filename, contentType, file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, async (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const command = new PutObjectCommand({
        Bucket: "upheals",
        Key: filename,
        Body: data,
        ContentType: contentType,
      });
      try {
        const response = await s3Client.send(command);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  });
}
async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "upheals",
    Key: key
  }) 
  const url =await  s3Client.send(command);
//  console.log(url);
//  const url = getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 * 7 });
  return url.Body
}
const { Readable } = require('stream')
const downloadDoc = (async (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
//  console.log(filename)

  const params = {
    Bucket: "upheals",
    Key: filename, // Concatenate the folder and file name
  };
  try {
    
    let url = await getObjectUrl(filename);
      const pdfStream = Readable.from(url);
      pdfStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    if (error.code === "NoSuchKey") {
      res.status(500).json({ status: 404, error: "File not found" });
    } else {
      res.status(500).json({ status: 500, error: "Failed to download file" });
    }
  }
});


const addImage1 = async (req, res, next) => {
  try {
    let url = await putObjectUrl(
      // ${req.file.filename},
      req.file.filename,
      req.file.mimetype,
      __dirname + "/uploads/" + req.file.filename
    );
    fs.unlink(__dirname + "/uploads/" + req.file.filename, (err) => {});
    res.data = {
      url: req.file.filename
    };
    res.status_Code = "200"
    next()

  } catch (error) {
    fs.unlink(__dirname + "/uploads/" + req.file.filename, (err) => {});
    res.message = error.message;
    res.error = true;
    res.status_Code = "402";
    next();
  }
};


  module.exports = {
  addImage,
  addImage1,
  downloadDoc
};
