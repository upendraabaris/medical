//const { getApps, initializeApp } = require("firebase-admin/app");
//const { getAuth } = require("firebase-admin/auth");

const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const jwt = require("jsonwebtoken");
//const admin = require("firebase-admin");

//const alreadyCreatedAps = getApps();
const nodemailer = require("nodemailer");
const axios = require("axios");
const queryString = require("querystring");

const asyncHandler = require("express-async-handler");

/* let config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "growmoreapp.india@gmail.com",
    pass: "ihtc prkb yofw cfbh",
  },
};
 */
function verifiedEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

function verifiedPhone(input) {
  var validRegex = '^[a-zA-Z0-9.%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9-]+.[a-zA-Z0-9-.]{2,61}$';
  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

const verifyContact = asyncHandler(async (req, res) => {
  try {
    if(verifiedPhone(req.body.entity)) {
        let found = await User.findOne({ email: req.body.entity, accCompany_id: req.companyId });
        if (found == null) {
          const user = await User.create({ email: req.body.entity, accCompany_id: req.companyId });
          let otp = Math.floor(Math.random() * 1000000);
          user.otp = otp;
          await user.save();
          const transporter = nodemailer.createTransport(config);
          let data = {
            from: "pulkit.abaris@gmail.com",
            to: req.body.entity,
            subject: "Growmore verification",
            text: "Dear Customer, " + user.otp + " is your otp verify!",
          };
          transporter.sendMail(data, (err, info) => {
            if (err) {
              throw new Error("Please recheck/enter email id !");
            } else {
              res.json({
                token: generateToken({ _id: user._id, type: "email" }),
              });
            }
          });  
    }
    else {
        if (found.emailVerified) {
            let otp = Math.floor(Math.random() * 1000000);
            found.otp = otp;
            await found.save();
            const transporter = nodemailer.createTransport(config);
            let data = {
              from: "pulkit.abaris@gmail.com",
              to: req.body.entity,
              subject: "Robotics verification",
              text: "Dear Customer, " + found.otp + " is your otp verify!",
            };
            transporter.sendMail(data, (err, info) => {
              if (err) {
                throw new Error("Please recheck/enter email id !");
              } else {
                res.json({
                  token: generateToken({ _id: found._id, type: "email" }),
                });
              }
            });  
            res.json({ token: generateToken({ _id: found._id, type: "email" }) });
          }
          else {
            throw new Error("Only business account is required");
          }
        }
    }
    else {
        throw new Error("Account must be business only!");
    }
}
catch(error) {
    throw new Error(error);
}
});
     

const verifyEmailOtp = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id._id);
    if (user.otp == req.body.otp) {
      user.verification = true;
      if (decoded.id.type == "email") {
        user.emailVerified = true;
      }
      await user.save();
      res.json({
        message: "success",
        token: generateToken({ id: user._id, type: 'User'}),
        isRegister: user.isRegister,
        emailVerified: user.emailVerified,
        email: user.email,
        phoneVerified: user.phoneVerified,
        mobile: user.phone,
      });
    } else {
      throw new Error(
        "Otp Not Matched! Please enter otp again/Check Mobile No/email Id"
      );
    }
  } catch (error) {
    throw new Error(error);
  }
});

const validateEmailOtp = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.otp == req.body.otp) {
      user.verification = true;
      user.emailVerified = true;
      await user.save();
      res.json(user);
    } else {
      throw new Error(
        "Otp Not Matched! Please enter otp again/Check Mobile No/email Id"
      );
    }
  } catch (error) {
    throw new Error(error);
  }
});

const verifyPhoneOtp = asyncHandler(async (req, res) => {
  try {
    getAuth()
      .verifyIdToken(req.body.id)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;
        let found = await User.findOne({ mobile: decodedToken.phone_number, accCompany_id: req.companyId });
        if(found == null) {
        let user = await User.create({
            mobile: decodedToken.phone_number,
            phoneVerified: true,
            accCompany_id: req.companyId
          });
          res.json({
            message: "success",
            token: generateToken({ id: user._id, type: 'User'}),
            isRegister: user.isRegister,
            emailVerified: user.emailVerified,
            email: user.email,
            phoneVerified: user.phoneVerified,
            mobile: user.phone,
          });
        }
        else {
          if(!found.phoneVerified) {
            found.phoneVerified = true;
            await found.save();
          }
          res.json({
            message: "success",
            token: generateToken({ id: found._id, type: 'User'}),
            isRegister: found.isRegister,
            emailVerified: found.emailVerified,
            email: found.email,
            phoneVerified: found.phoneVerified,
            mobile: found.phone,
          });
        }
      })
      .catch((error) => {
        throw new Error(error);
        // Handle error
      });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyPhoneOtpDirect = asyncHandler(async (req, res) => {
  try {
    getAuth()
      .verifyIdToken(req.body.id)
      .then(async (decodedToken) => {
        const uid = decodedToken.uid;
          let user = await User.create({
            mobile: decodedToken.phone_number,
            phoneVerified: true,
          });
          res.json({
            message: "success",
            token: generateToken({id: user._id, type: "User"}),
            isRegister: user.isRegister,
            emailVerified: user.emailVerified,
            email: user.email,
            phoneVerified: user.phoneVerified,
            mobile: user.phone,
          });
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyOtherPhone = asyncHandler(async (req, res) => {
  try {
    const found = await User.findById(req.user._id);
    getAuth()
      .verifyIdToken(req.body.id)
      .then(async (decodedToken) => {
        //            const uid = decodedToken.uid;
//        if (decodedToken.aud === "growmore-94b90") {
          found.phone = decodedToken.phone_number;
          found.phoneVerified = true;
          await found.save();
          res.json(found);
  //      }
        // ...
      })
      .catch((error) => {
        // Handle error
        throw new Error("Not verified");
      });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyOtherEmail = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let otp = Math.floor(Math.random() * 1000000);
    user.otp = otp;
    user.email = req.body.email;
    await user.save();
    const transporter = nodemailer.createTransport(config);
    let data = {
      from: "growmore@gmail.com",
      to: req.body.email,
      subject: "text",
      text: "Dear Customer, " + user.otp + " is your otp!",
    };
    transporter.sendMail(data, (err, info) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.json(info.response);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, emailVerified: true });
    if(user != null) {
      throw new Error("Email Already connected with different account!");
    }
    let otp = Math.floor(Math.random() * 1000000);
    const newUser = await User.create({ email: req.body.email, otp: otp });

    res.json({ message: "success" });
    /*     const transporter = nodemailer.createTransport(config);
    let data = {
      from: "growmore@gmail.com",
      to: req.body.email,
      subject: "text",
      text: "Dear Customer, " + user.otp + " is your otp!",
    };
    transporter.sendMail(data, (err, info) => {
      if (err) {
        throw new Error(err.message);
      } else {
        res.json(info.response);
      }
    });
 */  } catch (error) {
    throw new Error(error);
  }
});

const checkPhone = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ mobile: req.body.phone, phoneVerified: true, accCompany_id: req.companyId });
    if(user == null) {
      res.json({ message: "success" });
    }
    else {
      throw new Error("This no is already exist with another account");
    }
  }
  catch(error) {
    throw new Error(error);
  }
});

const register = asyncHandler(async (req, res) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.mobile = req.body.mobile;
        user.verification = true;
        user.password = req.body.password;
        await user.save();

        res.json({
          _id: user?._id,
          firstname: user?.firstname,
          lastname: user?.lastname,
          image: user?.profilePhoto,
          verification: user.verification,
          token: generateToken({ id: user?._id, type: "User" }),
        });
      }
    }
    else {
      res.status(401).json({ message: "Token is not attached to header!" });
    }
  }
  catch(error) {
    throw new Error(error);
  }
});


const login = asyncHandler(async (req, res) => {
  try {
    const findUser = await User.findOne({ email: new RegExp(email, "i"), emailVerified: true, verification: true });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        verification: findUser.verification,
        image: findUser?.profilePhoto,
        token: generateToken({ id: findUser?._id, type: "User" }),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  
  }
  catch(error) {
    throw new Error(error);
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    let cart;
    if (req.cookies.products != undefined && req.cookies.products != "undefined") {
      cart = req.cookies.products;
      cart?.forEach((count) => {
        if(String(count.country_id) == String(req.companyId)) {
          count.value = [] ;
        }
      });
    }

    let coupon;
    if (req.cookies.coupon != undefined && req.cookies.coupon != "undefined") {
      coupon = req.cookies.coupon;
      coupon?.forEach((count) => {
        if(String(count.country_id) == String(req.companyId)) {
          count.value = undefined ;
        }
      });
    }
    res.cookie("products", cart, {
      sameSite: "none",
      secret: "ewffv",
      secure: true,
    });
    res
    .cookie("coupon", coupon, {
      sameSite: "none",
      secret: "e3dfvd",
      secure: true,
    }).json({message: "success"})

  }
  catch(error) {
    throw new Error(error);
  }
})

const otpGenPhone = asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({ mobile: req.body.entity, accCompany_id: req.companyId });
    if(user == null) {
      let otp = Math.floor(Math.random() * 1000000);
      user = await User.create({ mobile: req.body.entity, accCompany_id: req.companyId, otp: otp });
      let msg = await axios.post("http://43.252.88.250/index.php/smsapi/httpapi/?" + queryString.stringify({
        secret:"sZmJlhH24vawCK4o9kVw",
        sender:"MSHFDC",
        tempid:"1607100000000291818",
        receiver:req.body.entity,
        route:"TA",
        msgtype:"1",
        sms:`Dear User, Your Login OTP is ${otp} Please do not share with anyone. Thanks, MSHFDC`
    }), {});

      res.json({ message: "success", token: generateToken({ id: user?._id, type: "User" }) });

    }
    else {
      let otp = Math.floor(Math.random() * 1000000);
      user.otp = otp;
      await user.save();
      let msg = await axios.post("http://43.252.88.250/index.php/smsapi/httpapi/?" + queryString.stringify({
        secret:"sZmJlhH24vawCK4o9kVw",
        sender:"MSHFDC",
        tempid:"1607100000000291818",
        receiver:req.body.entity,
        route:"TA",
        msgtype:"1",
        sms:`Dear User, Your Login OTP is ${otp} Please do not share with anyone. Thanks, MSHFDC`
    }), {});

      res.json({ message: "success", token: generateToken({ id: user?._id, type: "Login" })  });
    }
  }
  catch(error) {
    throw new Error(error);
  }
});

const otpPhoneVerify = asyncHandler(async (req, res) => {
  try {
    const decoded = jwt.decode(req.body.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id.id);
    if(user == null) {
      throw new Error("Your token is expired");
    }
    else {
      if(user.otp == req.body.otp) {
        res.json({ message: "success", token: generateToken({ id: user?._id, type: "User" }) });
      }
      else {
        throw new Error("Otp Doesn't match")
      }
    }
  }
  catch(error) {
    throw new Error(error);
  }
})

module.exports = {
  verifyContact,
  verifyEmailOtp,
  verifyPhoneOtp,
  //  verifyOtherAccount,
  verifyOtherPhone,
  verifyOtherEmail,
  validateEmailOtp,
  checkPhone,
  verifyEmail,
  verifyPhoneOtpDirect,
  register,
  login,
  logout,
  otpGenPhone,
  otpPhoneVerify
};
