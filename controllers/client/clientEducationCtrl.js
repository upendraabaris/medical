// const asyncHandler = require("express-async-handler");
const ClientEducation = require("../../models/client/clientEducationModel");

const getClientEducationList = (async (req, res) => {
  try {
    const getClientEducation = await ClientEducation.find();
    res.json(getClientEducation);
  } catch (error) {
    throw new Error(error);
  }
});

const createClientEducation = (async (req, res) => {
  try {
    if (req.body.education.length == 0 || req.body.education == undefined) {
      throw new Error("Must have education fields");
    }

    edus = [];
    req.body.education.forEach((education) => {
      education.user_id = req.user._id;
      if (education._id != undefined) {
        edus.push(
          ClientEducation.findByIdAndUpdate(education._id, education, {
            new: true,
          })
        );
      } else {
        edus.push(ClientEducation.create(education));
      }
      Promise.all(edus).then((result) => {
        res.json(result);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createClientEducationAdmin = (async (req, res) => {
  try {
    if (req.body.education.length == 0 || req.body.education == undefined) {
      throw new Error("Must have education fields");
    }

    edus = [];
    req.body.education.forEach((education) => {
      if (education._id != undefined) {
        edus.push(
          ClientEducation.findByIdAndUpdate(education._id, education, {
            new: true,
          })
        );
      } else {
        edus.push(ClientEducation.create(education));
      }
      Promise.all(edus).then((result) => {
        res.json(result);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateClientEducation = (async (req, res) => {
  try {
    req.body.user_id = req.user._id;
    const { id } = req.params;
    const getClientEducation = await ClientEducation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(getClientEducation);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteClientEducation = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientEducation = await ClientEducation.findByIdAndDelete(id);
    res.json(getClientEducation);
  } catch (error) {
    throw new Error(error);
  }
});

const getByIdClientEducation = (async (req, res) => {
  try {
    const id = req.user._id;
    const getClientEducation = await ClientEducation.find({ user_id: id });
    console.log(getClientEducation);
    res.json(getClientEducation);
  } catch (error) {
    throw new Error(error);
  }
});
const getByUserIdClientEducation = (async (req, res) => {
  try {
    const { id } = req.params;
    const getClientEducation = await ClientEducation.find({ user_id: id });
    res.json(getClientEducation);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClientEducationList,
  getByIdClientEducation,
  getByUserIdClientEducation,
  createClientEducation,
  createClientEducationAdmin,
  updateClientEducation,
  deleteClientEducation,
};
