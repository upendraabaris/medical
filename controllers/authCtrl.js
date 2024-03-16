const userModel = require("../models/user/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verifyIdentity = require("../models/user/verifyIdentityModel")

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

const isEmailExist = async(req,res,next)=>{
    try{
        const email = req.params.email
        
        if (!validateEmail(email)) {
            return res.status(400).send("Invalid email format");
        }
        console.log(email)
        const user = await userModel.findOne({ email: new RegExp(email,"i"), 
        // emailVerified: true,
    })
        if(!user){
            res.json({
                message: "success",
                statusCode: "200",
                error: false,
                data: { isExist: false }
            })
        }else{
            res.json({
                message: "success",
                statusCode: "200",
                error: false,
                data: { isExist: true }
            })
        }
        res.status_Code = "200";
    }
    catch(error){
        res.json(error)
    }
}

const isMobileNoExist = async(req,res,next)=>{
    try{
        const mobile_no = req.params.mobile

        if (!validateMobile(mobile_no)) {
            return res.status(400).send("Invalid mobile number format");
        }

        const user = await userModel.findOne({ mobile_no: mobile_no})
        if(!user){
            res.json({
                message: "success",
                statusCode: "200",
                error: false,
                data: { isExist: false }
            })
        }else{
            res.json({
                message: "success",
                statusCode: "200",
                error: false,
                data: { isExist: true }
            })
        }
        res.status_Code = "200";
    }
    catch(error){
        res.json(error)
    }
}

const verifyEmail = async(req,res,next)=>{
    try{
        const email = req.body.email
        
        if (!validateEmail(email)) {
            return res.status(400).send("Invalid email format");
        }
        const user = await verifyIdentity.findOne({ emailId: new RegExp(email,"i") })

        if(user == null){

            let otp = jwt.sign({otp: "1234"}, "djhjfdhkjgfdf")

            const newUser = await verifyIdentity.create({ emailId: email, otp })

            res.json({"token":jwt.sign({user: newUser._id}, "knjehavbfhskvj")})

        }else{
            let otp = jwt.sign({otp: "1234"}, "djhjfdhkjgfdf")
            user.otp = otp
            await user.save()
            res.json({ token:jwt.sign({user: user._id}, "knjehavbfhskvj") })
        }
        
    }
    catch(error){
        res.error = true,
        res.status_Code = 402,
        res.data = {
          message: error.message,
        },
        next()
    }
}

const verifyEmailOtp = async (req, res, next) => {
    try {
        const token = req.body.token;
        const otpFromUser = req.body.otp;
        console.log(token)
       
        const verifytoken = jwt.verify(token, "knjehavbfhskvj")?.user
        console.log(verifytoken)
        const user = await verifyIdentity.findById(verifytoken);

        if (!otpFromUser) {
            return res.status(400).json({ message: "OTP not provide" });
        }

        if (!user || !otpFromUser) {
            return res.status(400).json({ message: "Invalid email or OTP" });
        }

        const decodedOtp = jwt.verify(user.otp, "djhjfdhkjgfdf");
        console.log(decodedOtp)
        if (decodedOtp.otp !== req.body.otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Clear OTP after verification
        user.otp = null;
        user.emailVerified = jwt.sign({ isActive: true }, "dbhvjfdhvbnfd", { expiresIn: 300 })
        await user.save();

        // Provide a new token to the user (you may need to adjust this based on your application)
        res.json({ message: "email verify successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const login = async(req,res,next)=>{
    try{
        let email = req.body.email
        let password = req.body.password

        if (!validateEmail(email)) {
            return res.status(400).send("Invalid email format");
        }

        const user = await userModel.findOne({email: new RegExp(email,'i')})
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({user:user._id}, "upendrajain", {expiresIn: 3600 })
            console.log(token)
            res.status(201).send({"token":token})
            console.log(token)
        }else
        {
            res.send("Invalid login details")
        }
    }catch(error){
        res.status(400).send("Invalid login details")
    }
}

const register3 = async (req, res)=>{
    try{
        const token = req.body.email

        const verifytoken = jwt.verify(token, "knjehavbfhskvj")?.user

        const email = await verifyIdentity.findById(verifytoken)

        if(jwt.verify(email.emailVerified, "dbhvjfdhvbnfd")){
            email.emailId
            res.json(email)
        }else{
            throw new Error("email must be verified")
        }

    }catch(error){
        throw new Error(error)
    }
}

const forgotPasswordChange = async (req, res, next) => {
    try {
        const token = req.body.email

        const verifytoken = jwt.verify(token, "knjehavbfhskvj")?.user

        const email = await verifyIdentity.findById(verifytoken)

        if(jwt.verify(email.emailVerified, "dbhvjfdhvbnfd")){
            let data = req.body;
            const user = await userModel.findOne({ email: new RegExp(email.emailId,'i')});
            console.log(user)
            if(user == null){
                throw new Error("Account not found")
            }
            if(user.password == data.password){
                console.log("password matched")
            }else{
                console.log("password not matched")
            }
            user.password = data.password;
            await user.save();
        
            res.status_Code = 200;
            res.data = {
                message: "Password change successfully",
                user: user._id,
            };
            next()
        }else{
            throw new Error("email must be verified")
        }

    } catch (error) {
      res.error = true;
      res.status_Code = 402;
      res.data = {
        message: error.message,
      };
      next();
    }
  }


// const register = async (req, res) => {
//     try {
//         const { user_id, email, mobile } = req.body;
//         const otp = "1234";

//         const existingUser = await userModel.findOne({ $or: [{user_id}, { email }, { mobile }] });

//         if (existingUser) {
//             console.log('User already exists:', existingUser);
//             return res.status(400).json({ message: 'User already exists. Please log in.' });
//         }

//         const newUser = new userModel({
//             user_id,
//             email,
//             mobile,
//             otp,
//             entry_date: new Date(),
//             // status: 'Active',
//         });

//         await newUser.save();

//         console.log('User registered with OTP:', { email, mobile });

//         return res.json({ message: 'OTP sent successfully.' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// Verify OTP and proceed to the next step
// const register2 = async (req, res) => {
//     try {
//         const { email, mobile, otp } = req.body;
//         const user = await userModel.findOne({ $or: [{ email }, { mobile }], otp });

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid OTP.' });
//         }

//         // Clear the OTP after verification
//         await userModel.updateOne({ email, mobile }, { $unset: { otp: 1 } });

//         // Continue with the next registration steps...

//         return res.json({ message: 'OTP verified successfully. Continue with the next steps.' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// const verifyToken = async(req,res,next)=>{
//     try{
//         // let email = req.body.email
//         // let password = req.body.password

//         // if (!validateEmail(email)) {
//         //     return res.status(400).send("Invalid email format");
//         // }

//         // const user = await userModel.findOne({email: new RegExp(email,'i')})
//         // const isMatch = await bcrypt.compare(password,user.password)
//         const token = req.body.token
//         if(token){
//             const user = jwt.verify(token, "upendrajain")
//             const user1 = await userModel.findOne({user:user._id})
//             res.status(201).send(user1)
//             console.log(token)
//         }else
//         {
//             res.send("Invalid login details")
//         }
//     }catch(error){
//         res.status(400).send("Invalid login details")
//     }
// }


module.exports = { login, /* verifyToken, */ isEmailExist, isMobileNoExist, verifyEmail, verifyEmailOtp, /* register, register2, */ register3, forgotPasswordChange }
