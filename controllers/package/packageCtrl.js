const asyncHandler = require("express-async-handler");
const Package = require("../models/packageModel");
const Sequence = require("../models/packageSequenceModel");

const getPackageList = asyncHandler(async (req, res) => {
  try {
    const getPackage = await Package.find({
      accCompany_id: req.companyId,
      Currency_id: req.user.currency_id,
    }).populate("Currency_id");
    res.json({getPackage, language: req.user.language_id});
  } catch (error) {
    throw new Error(error);
  }
});

const createPackage = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    const seq = await Sequence.findByIdAndUpdate(
      "650e92617a87caf93e51a673",
      { $inc: { sequence: 1 } },
      { new: true }
    );

    req.body.uid = seq.sequence;

    let packages = [];

    req.body.list.forEach((item) => {
      item.accCompany_id = req.companyId;
      item.uid = req.body.uid;
      packages.push(Package.create({ ...item }));
    });

    Promise.all(packages).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePackage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let clarities = [];
    req.body.list.forEach((categ) => {
      clarities.push(Package.findById(categ._id));
    });

    Promise.all(clarities).then((result) => {
      let found = true;
      result.forEach((item) => {
        if (
          item == null ||
          String(item.accCompany_id) != String(req.companyId)
        ) {
          found = false;
        }
      });
      if (!found) {
        throw new Error("You are not authorize");
      } else {
        let updatePackage = [];
        req.body.list.forEach((item) => {
          updatePackage.push(
            Package.findByIdAndUpdate(item._id, item, { new: true })
          );
        });
        Promise.all(updatePackage).then((clarities) => {
          res.json(clarities);
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deletePackage = asyncHandler(async (req, res) => {
  try {
    let categories = await Package.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedPackage = [];
    categories.forEach((item) => {
      deletedPackage.push(Package.findByIdAndDelete(item._id));
    });
    Promise.all(deletedPackage).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdPackage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getPackage = await Package.find({
      accCompany_id: req.companyId,
      uid: id,
    }).populate("Currency_id");
    res.json(getPackage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPackageList,
  getByIdPackage,
  createPackage,
  updatePackage,
  deletePackage,
};
