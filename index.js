const express = require("express")
const mongoose = require("mongoose")
const {responseSend} = require("./utils/response")
const app = express()

const bodyParser = require("body-parser")

const dotenv = require("dotenv").config()

console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


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

const cors = require("cors")


app.use(
    cors({
      origin: [
        "http://localhost:5000",
      ],
      credentials: true,
    })
);

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

app.use(responseSend)
// const port = 5000
app.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT)
})

module.exports = app
//bcjdfb vejwksmk