const asyncHandler = require("express-async-handler");
const Faq = require("../models/faqCategoryMasterModel");
const Sequence = require("../models/faqCategoryMasterSequenceModel");

const getFaqList = asyncHandler(async (req, res) => {
  try {
    const getFaq = await Faq.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    });
    res.json(getFaq);
  } catch (error) {
    throw new Error(error);
  }
});

const getFaqListByLang = asyncHandler(async (req, res) => {
  try {
    const getFaq = await Faq.find({
      accCompany_id: req.companyId,
      language_id: req.params.id,
    });
    res.json(getFaq);
  } catch (error) {
    throw new Error(error);
  }
});

const createFaq = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    let sequence = await Sequence.findOne({ accCompany_id: req.companyId });
    if (sequence == null) {
      sequence = await Sequence.create({
        accCompany_id: req.companyId,
        sequence: 0,
      });
    }
    const seq = await Sequence.findByIdAndUpdate(
      sequence._id,
      { $inc: { sequence: 1 } },
      { new: true }
    );

    req.body.uid = seq.sequence;

    let clarity = [];

    req.body.list.forEach((item) => {
      /*       if (item.name) {
        item.slug = slugify(item.name);
      }
 */ if (item.parent_id == "null") {
        item.parent_id = undefined;
      }
      item.accCompany_id = req.companyId;
      item.uid = req.body.uid;
      console.log(item);
      clarity.push(Faq.create({ ...item }));
    });

    Promise.all(clarity).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateFaq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let clarities = [];
    req.body.list.forEach((categ) => {
      clarities.push(Faq.findById(categ._id));
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
        let updateFaq = [];
        req.body.list.forEach((item) => {
          updateFaq.push(
            Faq.findByIdAndUpdate(item._id, item, { new: true })
          );
        });
        Promise.all(updateFaq).then((clarities) => {
          res.json(clarities);
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteFaq = asyncHandler(async (req, res) => {
  try {
    let categories = await Faq.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedFaq = [];
    categories.forEach((item) => {
      deletedFaq.push(Faq.findByIdAndDelete(item._id));
    });
    Promise.all(deletedFaq).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdFaq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getFaq = await Faq.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getFaq);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  getFaqList,
  getFaqListByLang,
  getByIdFaq,
  createFaq,
  updateFaq,
  deleteFaq,
};
