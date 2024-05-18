const router = require("express").Router()

const {getSellerType, getSellerTypeById, addSellerType, updateSellerType, deleteSellerType, pagination, getSellerTypeByCategory, getSellerTypeByInstitution} = require("../../controllers/ecommerce/sellerTypeCtrl")

const {responseSend} = require("../../utils/response")

// const {verifyToken} = require("../../middleware/authMiddleware")
const {staffMiddleware} = require("../../middleware/authMiddleware")

router.get('/', staffMiddleware, getSellerType, responseSend)

router.get('/:id', staffMiddleware, getSellerTypeById, responseSend)

router.post('/addSellerType', staffMiddleware, addSellerType, responseSend)

router.get('/getSellerType/Category', getSellerTypeByCategory, responseSend)

router.get('/getSellerType/Institution', getSellerTypeByInstitution, responseSend)

router.put('/updateSellerType/:id', staffMiddleware, updateSellerType, responseSend)

router.delete('/deleteSellerType/:id', staffMiddleware, deleteSellerType, responseSend)

router.get('/page/:page&:count', pagination, responseSend)

const sellerTypeModel = require("../../models/ecommerce/sellerTypeModel")
router.put('/updateid/:oldId', async (req, res) => {
    try {
      const { oldId } = req.params;
  
      // Retrieve the old document
      const oldDocument = await sellerTypeModel.findById(oldId);
      if (!oldDocument) {
        return res.status(404).json({ message: 'Document not found' });
      }
  
      // Create a new document with updated _id and other fields
      const newDocumentData = { ...oldDocument.toObject(), _id: '65fd7f30ca55fe86cf3268a5', /* other fields */ };
      const newDocument = await sellerTypeModel.create(newDocumentData);
  
      // Optionally, delete the old document
      await sellerTypeModel.findByIdAndDelete(oldId);
  
      res.status(200).json({ message: 'Document updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router