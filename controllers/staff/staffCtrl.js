const StaffModel = require("../../models/staff/staffModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Client = require("../../middleware/redis")
const getStaff = async(req,res,next)=>{
    try{
        // let client = await Client.get('Staff');
        // let Staff;
        // if(client == null) {
        //     Staff = await StaffModel.find()
        //     await Client.set(`Staff`, JSON.stringify(Staff));
        // }
        // else {
        //     Staff = JSON.parse(client);
        // }
        const Staff = await StaffModel.find()
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const getStaffById = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findById(req.params.id);
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const addStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.create(req.body);
        console.log(Staff)
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const updateStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const deleteStaff = async(req,res,next)=>{
    try{
        const Staff = await StaffModel.findByIdAndDelete(req.params.id);
        res.data = Staff
        res.status_Code = "200"
        next()
    }catch(error){
        res.error = true;
        res.status_Code = "403";
        res.message = error.message
        res.data = {}
        next()
    }
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const validateMobile = (input) => {
    let test = input; /* .slice(3) */
    var validRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (test.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

const loginStaffByMobile = async(req,res,next)=>{
    try{
        // let email = req.body.email
        let mobile = req.body.mobile
        let password = req.body.password
        

        if (!validateMobile(mobile)) {
            return res.status(400).send("Invalid mobile format");
        }

        const staff = await StaffModel.findOne({mobile})
        const isMatch = await bcrypt.compare(password,staff.password)
        console.log(isMatch)
        if(isMatch){
            const token = jwt.sign({staff:staff._id}, "shicsdfhaljkvfjckds", {expiresIn: 24*60*60 })
            res.status(201).send(
                {
                    user: {
                      "token": token,
                      "first_name": staff.first_name,
                      "last_name": staff.last_name,
                      "profile_pic": staff.profile_pic
                    }
                  }
            )
        }else
        {
            res.send("Invalid login details")
        }
    }catch(error){
        console.log(error)
        res.status(400).send("Invalid login details")
    }
}
// const loginStaffByMobile = async (req, res, next) => {
//   try {
//       // Extract mobile and password from request body
//       let { mobile, password } = req.body;

//       // Validate mobile format
//       if (!validateMobile(mobile)) {
//           return res.status(400).send("Invalid mobile format");
//       }

//       // Find staff by mobile
//       const staff = await StaffModel.findOne({ mobile: new RegExp(mobile, 'i') });

//       // Check if staff exists
//       if (!staff) {
//           return res.status(400).send("Staff not found");
//       }

//       // Compare passwords
//       const isMatch = await bcrypt.compare(password, staff.password);

//       // Check if password is correct
//       if (isMatch) {
//           // Generate JWT token
//           const token = jwt.sign({ staff: staff._id }, "shicsdfhaljkvfjckds", { expiresIn: '24h' });

//           // Send response with token and user details
//           res.status(201).json({
//               user: {
//                   token: token,
//                   first_name: staff.first_name,
//                   last_name: staff.last_name,
//                   profile_pic: staff.profile_pic
//               }
//           });
//       } else {
//           // Password doesn't match
//           res.status(400).send("Invalid password");
//       }
//   } catch (error) {
//       // Log error for debugging
//       console.error(error);
//       // Send error response
//       res.status(500).send("Internal Server Error");
//   }
// }


const loginStaffByAdmin = async (req, res, next) => {
  try {
    let { identifier, password } = req.body; // Changed variable name from 'mobile' to 'identifier'

    // Determine if the identifier is a mobile number or an email address
    let isEmail = validateEmail(identifier); // Assume validateEmail() validates email addresses
    let isMobile = validateMobile(identifier);

    if (!isEmail && !isMobile) {
      return res.status(400).send("Invalid identifier format");
    }

    let staff;

    if (isEmail) {
      // If it's an email, find staff by email
      staff = await StaffModel.findOne({ email: new RegExp(identifier, 'i') });
    } else {
      // If it's a mobile number, find staff by mobile
      staff = await StaffModel.findOne({ mobile: new RegExp(identifier, 'i') });
    }

    // Check if staff exists
    if (!staff) {
      return res.status(400).send("Staff not found");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, staff.password);

    // Check if password is correct
    if (isMatch) {
      // Generate JWT token
      const token = jwt.sign({ staff: staff._id }, "shicsdfhaljkvfjckds", { expiresIn: '24h' });

      // Send response with token and user details
      res.status(201).json({
        user: {
          token: token,
          first_name: staff.first_name,
          last_name: staff.last_name,
          profile_pic: staff.profile_pic
        }
      });
    } else {
      // Password doesn't match
      res.status(400).send("Invalid password");
    }
  } catch (error) {
    // Log error for debugging
    console.error(error);
    // Send error response
    res.status(500).send("Internal Server Error");
  }
}


const getUserGenderRatio = async () => {
    try {
      const totalUsers = await StaffModel.countDocuments();
      const maleUsers = await StaffModel.countDocuments({ gender: 'Male' });
  
      return {
        male: maleUsers,
        female: totalUsers - maleUsers,
        total: totalUsers
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getUserAgeRange = async () => {
    try {
      const today = new Date();
      const users = await StaffModel.find({}, { dob: 1 });
      const totalUsers = users.length;
  
      let ageGroups = {
        '0-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-50': 0,
        '51-60': 0,
        '61+': 0
      };
  
      users.forEach(user => {
        let birthDate = new Date(user.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        
        // Adjust for leap years
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
  
        // Categorize users into age groups
        if (age <= 20) {
          ageGroups['0-20']++;
        } else if (age <= 30) {
          ageGroups['21-30']++;
        } else if (age <= 40) {
          ageGroups['31-40']++;
        } else if (age <= 50) {
          ageGroups['41-50']++;
        } else if (age <= 60) {
          ageGroups['51-60']++;
        } else {
          ageGroups['61+']++;
        }
      });
  
      return { ageGroups, totalUsers };
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const getStaffStats = async (req, res) => {
    try {
      const [genderRatio, ageRange] = await Promise.all([
        getUserGenderRatio(),
        getUserAgeRange()
      ]);
  
      res.json({ genderRatio, ageRange });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {getStaff, getStaffById, addStaff, updateStaff, deleteStaff, loginStaffByMobile, getStaffStats, loginStaffByAdmin}
