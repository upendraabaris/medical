const mongoose = require("mongoose");

const otherDetailSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    DFF: { type: String },
    served_up_home_guard: { type: String },
    ex_serviceman: { type: String },
    UP_Govt_Employee: { type: String },
    obtained_o_level_certificate: { type: String },
    ride_a_bycicle: { type: Number },
    are_you_widow: { type: String },
    minority_community_candidate: { type: String },
    benchmark_disabilities: { type: String },
    domiciled_in_jammu: { type: String },
    employee_in_central_government: { type: String },
    Serving_Group_C: { type: String },
    quasi_admiministrative: { type: String },
    UP_Ex_Army: { type: String },
    Skilled_Player_Of_UP: { type: String },
    ECO_of_Army: { type: String },
    complete_5year: { type: String },
    are_you_blind: { type: String },
    are_you_deaf: { type: String },
    physical_problem: { type: String },
    belongs_to_hill_area: { type: String },
    are_you_child: { type: String },
    west_pakistani_refugee: { type: String },
    convicted_by_any_court: { type: String },
    case_pending: { type: String },
    Has_any_FIR: { type: String },
    FIR_in_past: { type: String },
    dismissed_from_any_service: { type: String },
    services_terminated: { type: String },
    seller_id: { type: mongoose.Schema.Types.ObjectId, index:true, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, index:true, required: true }
  },
  {
    timestamps: true,
  }
);

otherDetailSchema.pre('save', function(next){
  if(this.type == "seller"){
    this.user_id = undefined
  }
  else if(this.type == "user"){
    this.seller_id = undefined
  }
  next()
})

otherDetailSchema.index({
  user_id: 1,
});

module.exports = mongoose.model("clientOtherDetails", otherDetailSchema);
