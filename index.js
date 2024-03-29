const express = require("express")
const mongoose = require("mongoose")
const {responseSend} = require("./utils/response")
const app = express()

const bodyParser = require("body-parser")

const dotenv = require("dotenv").config()

console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)


app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({extended: false, limit: "50mb"}))


const userRoute = require("./routes/user/userRoute")
const userTypeRoute = require("./routes/user/userTypeRoute")
const clientRoute = require("./routes/client/clientRoute")
const clientTypeRoute = require("./routes/client/clientTypeRoute")
const legalStatusRoute = require("./routes/client/legalStatusRoute")
const supplierRoute = require("./routes/supplier/supplierRoute")
const supplierTypeRoute = require("./routes/supplier/supplierTypeRoute")
const medicalSpecialtyRoute = require("./routes/medicalSpecialty/medicalSpecialtyRoute")
const superSpecializationRoute = require("./routes/medicalSpecialty/superSpecializationRoute")
const procedureRoute = require("./routes/procedureRoute")

const hospitalClinicRoute = require("./routes/hospital/hospitalClinicRoute")
const hospitalClinicTypeRoute = require("./routes/hospital/hospitalClinicTypeRoute")
const sosRoute = require("./routes/sos/sosRoute")
const sosTransactionRoute = require("./routes/sos/sosTransactionRoute")

const mediaRoute = require("./routes/media/mediaRoute")
const mediaTypeRoute = require("./routes/media/mediaTypeRoute")
const businessPartnerRoute = require("./routes/businessPartnerRoute")
const apiRoute = require("./routes/apiRoute")
const orderRoute = require("./routes/order/orderRoute")
const orderStatusRoute = require("./routes/order/orderStatusRoute")
const orderResponseTypeRoute = require("./routes/order/orderResponseTypeRoute")
const departmentRoute = require("./routes/departmentRoute")

const serviceRoute = require("./routes/service/serviceRoute")
const serviceProductCategoryRoute = require("./routes/service/serviceProductCategoryRoute")
const currencyRoute = require("./routes/currencyRoute")
const financeRoute = require("./routes/financeRoute")
const orderResponseRoute = require("./routes/order/orderResponseRoute")
const medicineTypeRoute = require("./routes/medicineTypeRoute")
const awardRoute = require("./routes/awardRoute")
const addressRoute = require("./routes/addressRoute")

const countryRoute = require("./routes/countryRoute")
const stateRoute = require("./routes/stateRoute")
const cityRoute = require("./routes/cityRoute")
const chiefComplaintRoute = require("./routes/chiefComplaintRoute")
const clinetDocumentRoute = require("./routes/client/clientDocumentRoute")
const clinetEducationRoute = require("./routes/client/clientEducationRoute")
const clientBasicDetailsRoute = require("./routes/client/clientBasicDetailsRoute")
const clientOtherDetailsRoute = require("./routes/client/clientOtherDetailRoute")
const clientOtherDocumentRoute = require("./routes/client/clientOtherDocumentRoute")
const clientPhysicalEligibilityRoute = require("./routes/client/clientPhysicalElegibilityRoute")
const clientCarriculamRoute = require("./routes/client/clientCarriculamRoute")

const patientVitalInfoRoute = require("./routes/patientVitalInfoRoute")
const emrRoute = require("./routes/emr/emrRoute")
const emrPictureGalleryRoute = require("./routes/emr/emrPictureGalleryRoute")
const emrQuestionTypeRoute = require("./routes/emr/emrQuestionTypeRoute")
const emrOptionRoute = require("./routes/emr/emrOptionRoute")
const emrResponseRoute = require("./routes/emr/emrResponseRoute")
const shippingAddressRoute = require("./routes/shippingAddressRoute")
const userInsuranceRoute = require("./routes/user/userInsuranceRoute")
const sosApplicationFormRoute = require("./routes/sos/sosApplicationRoute")

const serviceHistoryRoute = require("./routes/serviceHistoryRoute")
const bannerRoute = require("./routes/ecommerce/bannerRoute")
const attributeRoute = require("./routes/ecommerce/attributeRoute")
const brandRoute = require("./routes/ecommerce/brandRoute")
// const productRoute = require("./routes/ecommerce/productRoute")
// const productCateoryRoute = require("./routes/ecommerce/prodcategoryRoute")

const doctorRoute = require("./routes/doctor/doctorRoute")
const attributeSetMasterRoute = require("./routes/ecommerce/attributeSetMasterRoute")
const productIndustryRoute = require("./routes/ecommerce/prodIndustryRoute")
const productCategoryRoute = require("./routes/ecommerce/prodcategoryRoute")
const productRoute = require("./routes/ecommerce/productRoute")

const authRoute = require("./routes/authRoute")

const healthTipRoute = require("./routes/healthTipRoute")
const diseaseRoute = require("./routes/disease/diseaseRoute")
const diseaseCategoryRoute = require("./routes/disease/diseaseCategoryRoute")
const diseaseSubCategoryRoute = require("./routes/disease/diseaseSubCategoryRoute")
const diseaseSubRoute = require("./routes/disease/diseaseSubRoute")
const preExistingDiseaseRoute = require("./routes/disease/preExistingDiseaseRoute")

const qrCodeRegisterRoute = require("./routes/user/qrCodeRegisterRoute")
const userRelationRoute = require("./routes/user/userRelationRoute")
const userReferenceRoute = require("./routes/user/userReferenceRoute")
const favoriteContactRoute = require("./routes/favoriteContactRoute")


const postRoute = require("./routes/posts/postRoute")
const likeRoute = require("./routes/posts/likeRoute")
const commentRoute = require("./routes/posts/commentRoute")
// const orderRoute = require("./routes/ecommerce/orderRoute")
const cancelOrderRoute = require("./routes/ecommerce/cancelOrderRoute")
const cancelReasonRoute = require("./routes/ecommerce/cancelReasonRoute")
const orderTransactionRoute = require("./routes/ecommerce/orderTransactionRoute")
const cancelDeliveryRoute = require("./routes/ecommerce/cancelDeliveryRoute")

const bannerSellerRoute = require("./routes/ecommerce/bannerSellerRoute")
const blogRoute = require("./routes/ecommerce/blogsRoute")
const blogCategoryRoute = require("./routes/ecommerce/blogsCatRoute")

const zoneRoute = require("./routes/zoneRoute")

const regionRoute = require("./routes/regionRoute")

const staffRoute = require("./routes/staff/staffRoute")
const staffTypeRoute = require("./routes/staff/staffTypeRoute")

const sellerRoute = require("./routes/ecommerce/SellerRoute")
const languageRoute = require("./routes/languageRoute")

const cloudinaryRoute = require("./routes/cloudinaryRoute")

const cors = require("cors")


app.use(cors());

app.use('/api/user', userRoute)
app.use('/api/usertype', userTypeRoute)
app.use('/api/client', clientRoute)
app.use('/api/clienttype', clientTypeRoute)
app.use('/api/legalstatus', legalStatusRoute)
app.use('/api/supplier', supplierRoute)
app.use('/api/suppliertype', supplierTypeRoute)
app.use('/api/medicalspecialty', medicalSpecialtyRoute)
app.use('/api/superspecialization', superSpecializationRoute)
app.use('/api/procedure', procedureRoute)

app.use('/api/hospitalclinic', hospitalClinicRoute)
app.use('/api/hospitalclinictype', hospitalClinicTypeRoute)
app.use('/api/sos', sosRoute)
app.use('/api/sostransaction', sosTransactionRoute)

app.use('/api/media', mediaRoute)
app.use('/api/mediatype', mediaTypeRoute)
app.use('/api/business-partner', businessPartnerRoute)
app.use('/api/apimaster', apiRoute)
app.use('/api/order', orderRoute)
app.use('/api/order-status', orderStatusRoute)
app.use('/api/order-response-type', orderResponseTypeRoute)
app.use('/api/department', departmentRoute)

app.use('/api/service', serviceRoute)
app.use('/api/service-productcategory', serviceProductCategoryRoute)
app.use('/api/currency', currencyRoute)
app.use('/api/finance', financeRoute)
app.use('/api/order-response', orderResponseRoute)
app.use('/api/medicinetype', medicineTypeRoute)
app.use('/api/award', awardRoute)
app.use('/api/address', addressRoute)

app.use('/api/country', countryRoute)
app.use('/api/state', stateRoute)
app.use('/api/city', cityRoute)
app.use('/api/chief-complaint', chiefComplaintRoute)
app.use('/api/clinet-document', clinetDocumentRoute)
app.use('/api/clinet-education', clinetEducationRoute)
app.use('/api/client-basicdetails', clientBasicDetailsRoute)
app.use('/api/client-otherdetails', clientOtherDetailsRoute)
app.use('/api/client-otherdocument', clientOtherDocumentRoute)
app.use('/api/client-physical-eligibility', clientPhysicalEligibilityRoute)
app.use('/api/client-carriculam', clientCarriculamRoute)

app.use('/api/patient-vitalinfo', patientVitalInfoRoute)
app.use('/api/emr', emrRoute)
app.use('/api/emr-picture-gallery', emrPictureGalleryRoute)
app.use('/api/emr-question-type', emrQuestionTypeRoute)
app.use('/api/emr-option', emrOptionRoute)
app.use('/api/emr-response', emrResponseRoute)
app.use('/api/shipping-address', shippingAddressRoute)
app.use('/api/user/insurance', userInsuranceRoute)
app.use('/api/sos/application', sosApplicationFormRoute)

app.use('/api/service-history', serviceHistoryRoute)
app.use('/abi/banner', bannerRoute)
app.use('/api/attribute', attributeRoute)
app.use('/api/brands', brandRoute)
// app.use('/api/product', productRoute)
// app.use('/api/product/category', productCateoryRoute)

app.use('/api/doctor', doctorRoute)
app.use('/api/attribute-set', attributeSetMasterRoute)
app.use('/api/product-industry', productIndustryRoute)
app.use('/api/product-category', productCategoryRoute)
app.use('/api/product', productRoute)

app.use('/api/auth', authRoute)

app.use('/api/health-tip', healthTipRoute)
app.use('/api/disease', diseaseRoute)
app.use('/api/disease-category', diseaseCategoryRoute)
app.use('/api/disease-subcategory', diseaseSubCategoryRoute)
app.use('/api/diseasesub', diseaseSubRoute)
app.use('/api/pre-existing-disease', preExistingDiseaseRoute)

app.use('/api/qr-code-register', qrCodeRegisterRoute)
app.use('/api/user/user-relation-type', userRelationRoute)
app.use('/api/user/user-reference', userReferenceRoute)
app.use('/api/favorite-contact', favoriteContactRoute)

app.use('/api/posts', postRoute)
app.use('/api/likes', likeRoute)
app.use('/api/comments', commentRoute)
app.use('/api/order/cancel-order', cancelOrderRoute)
app.use('/api/order/cancel-reason', cancelReasonRoute)
app.use('/api/order/order-transaction', orderTransactionRoute)
app.use('/api/order/cancel-delivery', cancelDeliveryRoute)

app.use('/api/order/banner-seller', bannerSellerRoute)
app.use('/api/order/blogs', blogRoute)
app.use('/api/order/blog-category', blogCategoryRoute)

app.use('/api/zone', zoneRoute)

app.use('/api/region', regionRoute)

app.use('/api/staff', staffRoute)
app.use('/api/stafftype', staffTypeRoute)

app.use('/api/seller', sellerRoute)
app.use('/api/language', languageRoute)

app.use('/api/cloudinary', cloudinaryRoute)

app.use(responseSend)
// const port = 5000
app.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT)
})

module.exports = app
//bcjdfb vejwksmk eorivowerf