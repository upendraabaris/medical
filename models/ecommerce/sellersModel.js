const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const sellerSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    // profilePhoto: {
    //   public_id: String,
    //   url: String,
    // },
    profilePhoto: { type: String },

    dob: { type: String },

    adhaar_card: { type: String },
    pan_card: { type: String },

    role: { type: String, default: "Seller", enum: ["Seller", "seller"] },
    approve: { type: Boolean, default: true },

    accGroup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accGroupUnderMaster",
    },

    instaId: { type: String },
    fbId: { type: String },
    twitterId: { type: String },
    youtubeId: { type: String },
    linkedinId: { type: String },
    // city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },

    language_id: { type: mongoose.Schema.Types.ObjectId, ref: 'languages' },
    currency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'currency' },

    long: { type: String },
    lat: { type: String },
    addressLine1: String,
    addressLine2: String,
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State'},
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
    postal_code:{ type: mongoose.Schema.Types.ObjectId, ref: 'postalCode' },
    landmark: String,
    province: String,
    seller_package_id: String,
    remaining_uploads: Number,
    remaining_digital_uploads: Number,
    invalid_at: String,
    remaining_auction_uploads: Number,
    rating: Number,
    num_of_reviews: Number,
    num_of_sale: Number,
    verification_status: Number,
    verification_info: String,
    cash_on_delivery_status: Number,
    admin_to_pay: Number,
    bank_name: String,
    bank_acc_name: String,
    bank_acc_no: String,
    bank_routing_no: String,
    bank_payment_status: Number,
    tax_number: String,
    sellerType: { type: mongoose.Schema.Types.ObjectId, ref: "SellerType", index: true },
    informations: [
      {
        type: { type: String },
        label: { type: String },
        name: { type: String },
        value: { type: String },
      },
    ],
    address: { type: String },
    
    parent_hos_clinic_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers', required: false },
    hos_clinic_name: { type: String, /* required: true */ },
    hos_clinic_type_id: { type: mongoose.Schema.Types.ObjectId, /* required: true, */ ref: "HospitalClinicType", index: true },
    brief_description: { type: String },
    // profile: { type: String, required: true },
    special_note: { type: String },

    isfavorite: { type: Boolean, default: false },
    referring_user_id: { type: Number, ref: 'User', index: true },
    // user_id: { type: Number, ref: 'User', index: true },
    is_surgeon: { type: Boolean, default: false },
    zone_id: { type: Number, ref: 'Zone', index: true },
    is_super30: { type: Boolean, default: false },

    // name: { type: String, required: true, ref: 'User', index: true }, // firstname+secondname+lastname from user master
    medicine_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicineType', index: true },
    medical_specialty_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MedicalSpecialty', index: true }],
    qualifications: { type: String },
    // profilepic: { type: String, /* validate: /^https?:\/\//i  */},
    briefbio: { type: String },
    doctorbio: { type: String },
    doctor_fee_IND: { type: Number },
    doctor_fee_INT: { type: Number },
    doctor_hospital_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'sellers' }],
    superSpecializationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SuperSpecialization', index: true }],
    sub_speciality_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSpeciality', index: true }], //doctor only

    accreditations: [{ type: String }], // Multiselect, Array of strings
    registrationNumber: { type: String }, // Registration Number
    registrationYear: { type: Number }, // Registration Year

    department: [{ type: String }],
    designation: [{ type: String }],
    award: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Award', index: true }],
    empanelment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HospitalEmpanelmentMaster', index: true }],

    criminalRecordCheck: { type: Boolean, default: false },
    educationalQualificationCheck: { type: Boolean, default: false },
    employmentRecordReferenceCheck: { type: Boolean, default: false },
    addressVerificationCheck: { type: Boolean, default: false },
    referenceCheck: { type: Boolean, default: false },
    financialFraudCheck: { type: Boolean, default: false },
    socialMediaCheck: { type: Boolean, default: false },
    reputationCheck: { type: Boolean, default: false },
    checkBy: { type: String },
    checkDate: { type: Date/* , default: Date.now */ },

    healthauditor: { type: Boolean, default: false },
    sellerCode: { type: String },
    seller_signature: { type: String }, //doctor only

    insurance_empanelment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InsuranceEmpanelment', index: true }], //hopital
    hopital_profile: { type: String }, //hopital(pdf)
    website_url: { type: String }, //hspital
    isAvailableOnline: { type: Boolean, default: false },//doctor
    isAvailableForDigitalCme: { type: Boolean, default: false }, //doctor
    isAvailableForOnSiteSurgery: { type: Boolean, default: false }, //doctor
    profile_pdf: { type: String }, // doctor
    star_doctor: { type: Boolean, default: false }, //doctor
    hospital_logo: { type: String },//hospital
    // engagement_type: { type: mongoose.Schema.Types.ObjectId, ref:'EngagementType'},
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sellers' },
    // supplier: { type: String },
    block_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Block' },
    staff_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff'},
    is_active: { type: Boolean, default: true }
  }, 
  {
    timestamps: true,
  }
);

sellerSchema.index({ "$**": "text" });

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
sellerSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
sellerSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};


// const SellerType = require("../user/userTypeModel");
const SellerType = require("../ecommerce/sellerTypeModel");

// Define a pre-save hook to generate unique seller code
sellerSchema.pre('save', async function (next) {
  try {
    // Check if the seller code already exists
    if (!this.sellerCode) {
      // Find the sellerType document by its ObjectId
      const sellerType = await SellerType.findById(this.sellerType);

      if (!sellerType) {
        throw new Error('SellerType not found.');
      }

      // Find the latest seller with the same seller type to get the maximum sequence number
      const latestSeller = await this.constructor.findOne({ sellerType: sellerType._id }).sort({ sellerCode: -1 });
      // Extract the sequence number from the seller code and increment it
      let sequenceNumber = 101;
      if (latestSeller && latestSeller.sellerCode) {
        const parts = latestSeller.sellerCode.split('-');
        sequenceNumber = parseInt(parts[1]) + 1;
      }

      // Extract the first three characters of the user_type
      const userTypePrefix = sellerType.seller_type.substring(0, 3);

      // Generate the new seller code with the first three characters of user_type
      this.sellerCode = `${userTypePrefix}-${sequenceNumber}`;

      // Generate the new seller code
      // this.sellerCode = `${sellerType.user_type.substring(0, 3)}-${sequenceNumber}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("sellers", sellerSchema);
