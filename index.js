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
// const orderRoute = require("./routes/order/orderRoute")
// const orderStatusRoute = require("./routes/order/orderStatusRoute")
// const orderResponseTypeRoute = require("./routes/order/orderResponseTypeRoute")
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
const sosProfileRoute = require("./routes/sos/sosProfileRoute")

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

const paymentGatewayRoute = require("./routes/paymentGatewayRoute")

const cloudinaryRoute = require("./routes/cloudinaryRoute")

const medicalConsultationRoute = require("./routes/MedicalConsultantionRoute")
const sellerPhotoGalleryRoute = require("./routes/ecommerce/sellerPhotoGalleryRoute")
const sellerVideoGalleryRoute = require("./routes/ecommerce/sellerVideoGalleryRoute")

const healthProfileRoute = require("./routes/healthProfileRoute")

const generalSettingRoute = require("./routes/generalSettingRoute")

const orderRoute1 = require("./routes/ecommerce/orderRoute")

const orderStatusRoute = require("./routes/ecommerce/orderStatusMasterRoute")
const paymentStatusRoute = require("./routes/ecommerce/paymentStatusMasterRoute")


const healthAssessment = require("./routes/healthAssessmentQuestionRoute")

const hospitalEmpanelmentRoute = require("./routes/hospital/HospitalEmpanelmentRoute")
const designationRoute = require("./routes/designationRoute")

const subSpecialityRoute = require("./routes/medicalSpecialty/subSpecialityRoute")
const vitalCategoryRoute = require("./routes/vitalCategoryRoute")
const vitalListingRoute = require("./routes/vitalListingRoute")


const postTypeRoute = require("./routes/posts/postTypeRoute")

const insuranceEmpanelmentRoute = require("./routes/insuranceEmpanelmentRoute")
const testimonialRoute = require("./routes/testimonialRoute")
const doctorAttendentRoute = require("./routes/doctorAttendentRoute")

const sellerTypeRoute = require("./routes/ecommerce/sellerTypeRoute")
const orderTypeRoute = require("./routes/ecommerce/orderTypeRoute")

const eventTypeRoute = require("./routes/eventTypeRoute")
const eventRoute = require("./routes/eventRoute")

const postalCodeRoute = require("./routes/postalCodeRoute")

const blockRoute = require("./routes/blockRoute")
const engagementTypeRoute = require("./routes/engagementTypeRoute")

const userRoleRoute = require("./routes/user/userRoleRoute")
const sellerUserRoute = require("./routes/ecommerce/sellerUserRoute")
const sellerEngagementMappingRoute = require("./routes/ecommerce/sellerEngagementMappingRoute")
const unitRoute = require("./routes/ecommerce/unitRoute")

const sellerUserMappingRoute = require("./routes/ecommerce/sellerUserMappingRoute")


const packageTypeRoute = require("./routes/packageTypeRoute")
const admissionTypeRoute = require("./routes/admissionTypeRoute")
const indicationForAdmissionRoute = require("./routes/indicationRoute")
const NbsuPatientRoute = require("./routes/nbsuPatientRoute")
const patientIndicationMappingRoute = require("./routes/patientIndicationMappingRoute")
const presumptiveDiagnosisRoute = require("./routes/presumptiveDiagnosisRoute")
const nbMotherDataRoute = require("./routes/nbMotherDataRoute")

const nbBirthRoute = require("./routes/nbBirthRoute")
const packageRoute = require("./routes/packageRoute")
const resuscitationRoute = require("./routes/resuscitationRoute")

const clinicalDiagnosisRoute = require("./routes/clinicalDiagnosisRoute")
const eventBookingRoute = require("./routes/eventBookingRoute")

const nbsuChiefComplaintRoute = require("./routes/nbsuChiefComplaintRoute")
const nbsuDiagnosisMappingRoute = require("./routes/nbsuDiagnosisRoute")
const sosContactRoute = require("./routes/sos/sosContactRoute")


const vitalGroupRoute = require("./routes/vitalGroupRoute")

const systemicExaminationRoute = require("./routes/systemicExaminationRoute")
const vitalValueRoute = require("./routes/vitalValueRoute")
const radiologyDiagnosisRoute = require("./routes/radiologyDiagnosisRoute")
const generalExaminationRoute = require("./routes/generalExaminationRoute")
const radiologyVitalValueRoute = require("./routes/radiologyVitalValueRoute")

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
// app.use('/api/order', orderRoute)
// app.use('/api/order-status', orderStatusRoute)
// app.use('/api/order-response-type', orderResponseTypeRoute)
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
app.use('/api/sosprofile', sosProfileRoute)

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
app.use('/api/user-relation', userRelationRoute)
app.use('/api/user-reference', userReferenceRoute)
app.use('/api/favorite-contact', favoriteContactRoute)

app.use('/api/post', postRoute)
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

app.use('/api/paymentGateway', paymentGatewayRoute)

app.use('/api/medicalConsultation', medicalConsultationRoute)
app.use('/api/sellerPhotoGallery', sellerPhotoGalleryRoute)
app.use('/api/sellerVideoGallery', sellerVideoGalleryRoute)

app.use('/api/healthprofile', healthProfileRoute)

app.use('/api/upheals/general-settings', generalSettingRoute)
app.use('/api/orders', orderRoute1)

app.use('/api/order-status', orderStatusRoute)
app.use('/api/payment-status', paymentStatusRoute)

app.use('/api/healthAssessment', healthAssessment)

app.use('/api/hospitalEmpanelment', hospitalEmpanelmentRoute)
app.use('/api/designation', designationRoute)
app.use('/api/subSpeciality', subSpecialityRoute)
app.use('/api/vitalCategory', vitalCategoryRoute)
app.use('/api/keyvitalListing', vitalListingRoute)

app.use('/api/post-type', postTypeRoute)

app.use('/api/insuranceEmpanelment', insuranceEmpanelmentRoute)
app.use('/api/testimonial', testimonialRoute)
app.use('/api/doctorAttendent', doctorAttendentRoute)

app.use('/api/sellerType', sellerTypeRoute)
app.use('/api/orderType', orderTypeRoute)

app.use('/api/eventType', eventTypeRoute)
app.use('/api/event', eventRoute)
app.use('/api/postalCode', postalCodeRoute)

app.use('/api/sellerUser', sellerUserRoute)

app.use('/api/block', blockRoute)
// app.use('/api/engagementType', engagementTypeRoute)

app.use('/api/userRole', userRoleRoute)
app.use('/api/sellerEngagement', sellerEngagementMappingRoute)
app.use('/api/unit', unitRoute)

app.use('/api/sellerUserMapping', sellerUserMappingRoute)

app.use('/api/packagetype', packageTypeRoute)
app.use('/api/admissionType', admissionTypeRoute)
app.use('/api/indication', indicationForAdmissionRoute)
app.use('/api/NbsuPatient', NbsuPatientRoute)
app.use('/api/patientIndicationMapping', patientIndicationMappingRoute)
// app.use('/api/presumptiveDiagnosis', presumptiveDiagnosisRoute)
app.use('/api/nbMotherData', nbMotherDataRoute)

app.use('/api/nbBirth', nbBirthRoute)
app.use('/api/package',packageRoute)
app.use('/api/resuscitation', resuscitationRoute)

app.use('/api/clinicalDiagnosis', clinicalDiagnosisRoute)
app.use('/api/eventBooking', eventBookingRoute)

app.use('/api/nbsuChiefComplaint', nbsuChiefComplaintRoute)
app.use('/api/nbsuDiagnosisMapping', nbsuDiagnosisMappingRoute)
app.use('/api/sosContact', sosContactRoute)

app.use('/api/vitalGroup', vitalGroupRoute)

app.use('/api/systemicExamination', systemicExaminationRoute)
app.use('/api/vitalValue', vitalValueRoute)
app.use('/api/radiologyDiagnosis', radiologyDiagnosisRoute)
app.use('/api/generalExamination', generalExaminationRoute)
app.use('/api/radiologyVitalValue', radiologyVitalValueRoute)

// const axios = require("axios")
// app.post('/send-sms', async(req, res, next) => {
//     try{
//         const { phone, message } = req.body;

//     // Replace with your actual GupShup credentials
//     const userId = '8851746286';
//     const password = 'mYXxXUCw';

    

//     const data = await axios.post("https://enterprise.smsgupshup.com/GatewayAPI/rest", {
//         method: 'sendMessage',
//         send_to: phone,
//         msg: message,
//         msg_type: 'TEXT',
//         userid: userId,
//         auth_scheme: 'PLAIN',
//         password: password,
//         format: 'JSON'
//       }, {})
    
    
  
//     const options = {
//       method: 'POST',
//       url: 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
//       form: {
//         method: 'sendMessage',
//         send_to: phone,
//         msg: message,
//         msg_type: 'TEXT',
//         userid: userId,
//         auth_scheme: 'PLAIN',
//         password: password,
//         format: 'JSON'
//       }
//     };
//     res.json(data.data)
//     next()
  
//     }catch(error){
//         throw new Error(error.message)
//     }
//   });
const http = require("http")
const { Server } = require("socket.io")

const server = http.createServer(app)
const io = new Server(server, {
  // cors: true,
  cors: {
    origin: "*", // Replace with your Next.js app origin
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket)=>{
  console.log("A user connected:", socket.id)

  socket.on("send-message", (data)=>{
      io.to(data.receiverSocketId).emit("receive-message",{
          sender: socket.id,
          text: data.text
      })
  })
  // socket.on('disconnect', () => {
  //     console.log('A user disconnected:', socket.id);
  //   })

  // Triggered when a peer hits the join room button.
  socket.on("join", (roomName) => {
    const {rooms} = io.sockets.adapter;
    const room = rooms.get(roomName);

    // room == undefined when no such room exists.
    if (room === undefined) {
      socket.join(roomName);
      socket.emit("created");
    } else if (room.size === 1) {
      // room.size == 1 when one person is inside the room.
      socket.join(roomName);
      socket.emit("joined");
    } else {
      // when there are already two people inside the room.
      socket.emit("full");
    }
    console.log(rooms);
  });
  // Triggered when the person who joined the room is ready to communicate.
  socket.on("ready", (roomName) => {
    socket.broadcast.to(roomName).emit("ready"); // Informs the other peer in the room.
  });

  // Triggered when server gets an icecandidate from a peer in the room.
  // socket.on("ice-candidate", (candidate: RTCIceCandidate, roomName: string) => {
  //   console.log(candidate);
  //   socket.broadcast.to(roomName).emit("ice-candidate", candidate); // Sends Candidate to the other peer in the room.
  // });
  
  // Triggered when server gets an offer from a peer in the room.
  socket.on("offer", (offer, roomName) => {
    socket.broadcast.to(roomName).emit("offer", offer); // Sends Offer to the other peer in the room.
  });

  // Triggered when server gets an answer from a peer in the room.
  socket.on("answer", (answer, roomName) => {
    socket.broadcast.to(roomName).emit("answer", answer); // Sends Answer to the other peer in the room.
  });

  socket.on("leave", (roomName) => {
    socket.leave(roomName);
    socket.broadcast.to(roomName).emit("leave");
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    socket.emit(socket.id)
  })

})

const path = require("path")

app.use(express.static(path.resolve('./public')))
app.get('/', (req,res)=>{
  res.sendFile('/public/index.html')
})


app.use(responseSend)
// const port = 5000
server.listen(process.env.PORT,()=>{
    console.log("server is running on port",process.env.PORT)
})



module.exports = app
//bcjdfb vejwksmk eorivowerf