// const asyncHandler = require("express-async-handler");
const ClientDocument = require("../../models/client/clientDocumentModel");

const getClientDocumentList = (async (req, res) => {
    try {
        const getClientDocument =await ClientDocument.find();
        res.json(getClientDocument);
    }
    catch(error) {
        throw new Error(error);
    }
});

const createClientDocument = (async (req, res) => {
    try {
        req.body.user_id = req.user._id;
        let found = await ClientDocument.findOne({user_id: req.body.user_id});
        if (found != null) {
          const getClientBasic = await ClientDocument.findByIdAndUpdate(found._id, req.body, {
            new: true,
          });
          res.json(getClientBasic);
        } else {    
        const getClientDocument = await ClientDocument.create(req.body);
        res.json(getClientDocument);
        }
    }
    catch(error) {
        throw new Error(error);
    }
});

const updateClientDocument = (async (req, res) => {
    try {
        req.body.user_id = req.user._id;
        const {id} = req.params
        const getClientDocument = await ClientDocument.findByIdAndUpdate(id, req.body, { new: true });
        res.json(getClientDocument);
    }
    catch(error) {
        throw new Error(error);
    }
});

const deleteClientDocument = (async (req, res) => {
    try {
        const {id} =req.params;
        const getClientDocument = await ClientDocument.findByIdAndDelete(id);
        res.json(getClientDocument);
    }
    catch(error) {
        throw new Error(error);
    }
});

const getByIdClientDocument = (async (req, res) => {
    try {
        const {id} =req.params;
        const getClientDocument = await ClientDocument.findById(id);
        res.json(getClientDocument);
    }
    catch(error) {
        throw new Error(error);
    }
});

module.exports = {
    getClientDocumentList,
    getByIdClientDocument,
    createClientDocument,
    updateClientDocument,
    deleteClientDocument
}

