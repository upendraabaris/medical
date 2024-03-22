const asyncHandler = require("express-async-handler");
const Faqs = require("../models/faqModel");
const Sequence = require("../models/faqSequenceModel");

const getFaqsList = asyncHandler(async (req, res) => {
  try {
    const getFaqs = await Faqs.find({
      accCompany_id: req.companyId,
      language_id: req.user.language_id,
    }).populate("category_id");
    res.json(getFaqs);
  } catch (error) {
    throw new Error(error);
  }
});

const getFaqsListByLang = asyncHandler(async (req, res) => {
  try {
    const getFaqs = await Faqs.find({
      accCompany_id: req.companyId,
      language_id: req.params.id,
    });
    res.json(getFaqs);
  } catch (error) {
    throw new Error(error);
  }
});

const createFaqs = asyncHandler(async (req, res) => {
  try {
    req.body.accCompany_id = req.companyId;
    console.log(req.companyId);
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
      clarity.push(Faqs.create({ ...item }));
    });

    Promise.all(clarity).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateFaqs = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let clarities = [];
    req.body.list.forEach((categ) => {
      clarities.push(Faqs.findById(categ._id));
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
        let updateFaqs = [];
        req.body.list.forEach((item) => {
          updateFaqs.push(
            Faqs.findByIdAndUpdate(item._id, item, { new: true })
          );
        });
        Promise.all(updateFaqs).then((clarities) => {
          res.json(clarities);
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteFaqs = asyncHandler(async (req, res) => {
  try {
    let categories = await Faqs.find({
      accCompany_id: req.companyId,
      uid: req.params.id,
    });
    let deletedFaqs = [];
    categories.forEach((item) => {
      deletedFaqs.push(Faqs.findByIdAndDelete(item._id));
    });
    Promise.all(deletedFaqs).then((result) => {
      res.json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdFaqs = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getFaqs = await Faqs.find({
      accCompany_id: req.companyId,
      uid: id,
    });
    res.json(getFaqs);
  } catch (error) {
    throw new Error(error);
  }
});

const getFaqsByCategory = asyncHandler(async (req, res) => {
  try {
    const faqs = await Faqs.find({ accCompany_id: req.companyId, language_id: req.user.language_id, category_id: req.params.id });
    res.json(faqs);
  }
  catch(error) {
    throw new Error(error);
  }
})

module.exports = {
  getFaqsList,
  getFaqsListByLang,
  getByIdFaqs,
  createFaqs,
  updateFaqs,
  deleteFaqs,
  getFaqsByCategory
};
