const { now } = require("mongoose");
const Admin = require("../models/Admin");
const Pharmacist = require("../models/Pharmacist");
const PharmacistRequest = require("../models/PharmacistRequest");
const Patient = require("../models/Patient");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const jwtSecret = '4715aed3c946f7b0a38e6b53d700770d572af3dce43625dd';

//Create toke with username
const createToken = (username, p_role) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ username, role: p_role}, jwtSecret, {
        expiresIn: maxAge
    });
};

//Register patient and add to database
const registerPatient =  async (req,res) => {
      const {
        username,
        name,
        email,
        password,
        dateOfBirth,
        gender,
        mobileNumber,
        emergencyContact,
      } = req.body;

      let nameTaken;
      let emailTaken;

      let patientTemp = await Patient.findOne({username})
      if(patientTemp){
        nameTaken=true;
      }
    
      patientTemp = await  Patient.findOne({email})
      if(patientTemp){
        emailTaken=true;
      }
    
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      try {
        if(!nameTaken && !emailTaken){
          const patient = await Patient.create({
            username,
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            gender,
            mobileNumber,
            emergencyContact: {
              fullName: emergencyContact.fullName,
              mobileNumber: emergencyContact.mobileNumber,
              //check here
              relationToPatient: emergencyContact.relationToPatient,
            },
          });
          res.status(200).json({
            message: "Created patient successfully",
            success: true,
            data: patient,
          });
        }
        else if(nameTaken){
          res.status(400).json({
            message: "Username already taken",
            success: false,
            data: null,
          });
        }
        else{
          res.status(400).json({
            message: "Email already taken",
            success: false,
            data: null,
          });
        }
      } catch (err) {
        res.status(400).json({
          message: err.message,
          success: false,
          data: null,
        });
    }
};


//Register doctor and add registeration request to database
const registerPharmacist =  async (req,res) => {
    const {
        username,
        name,
        email,
        password,
        dateOfBirth,
        hourlyRate,
        affiliatedHospital,
        educationalBackground,
      } = req.body;
    
      let nameTaken;
      let emailTaken;

      let pharmacist = await Pharmacist.findOne({username});
      let pharmacistTemp = await PharmacistRequest.findOne({username});
  
      if(pharmacist || pharmacistTemp){
        nameTaken=true;
      }
  
    
      pharmacist = await Pharmacist.findOne({email})
      pharmacistTemp = await PharmacistRequest.findOne({email});
      if(pharmacist || pharmacistTemp){
        emailTaken=true;
      }


      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      try {
        if(!nameTaken && !emailTaken){
          const pharmacistInsert = await PharmacistRequest.create({
            username,
            name,
            email,
            password: hashedPassword,
            dateOfBirth,
            hourlyRate,
            affiliatedHospital,
            educationalBackground,
          });
          res.status(200).json({
            message: "Submitted application successfully",
            status: true,
            data: doctorInsert,
          });
        }
        else if(nameTaken){
          res.status(400).json({
            message: "Username already taken",
            success: false,
            data: null,
          });
        }
        else{
          res.status(400).json({
            message: "Email already taken",
            success: false,
            data: null,
          });
        }  
      } catch (err) {
        res.status(400).json({
          message: err.message,
          status: false,
          data: null,
        });
      }
};

//Login user
const login = async (req,res) => {
  const {username, password} = req.body;
  try{
      const user1 = await Admin.findOne({username});
      const user2 = await Pharmacist.findOne({username});
      const user3 = await Patient.findOne({username});
      const user4 = await PharmacistRequest.findOne({username});
      let hashedPassword;
      let role;
      let reply;

      if(!user1 && !user2 && !user3 && !user4){
        reply = {
          success: false,
          data: null,
          message: "User not found",
        };
        res.status(400).json(reply);
      }
      else{
        if (user1) {
          hashedPassword = user1.password;
          role = "Admin";
        }
        else if (user2){
          hashedPassword = user2.password;
          role = "Pharmacist";
        }
        else if (user4){
          hashedPassword = user4.password;
          role = "PharmacistRequest";
        }
        else{
          hashedPassword = user3.password;
          role = "Patient";
        }
        
        const bool = await bcrypt.compare(password, hashedPassword);
        if (bool){
          const maxAge = 3 * 24 * 60 * 60;
          const token =  jwt.sign({ username, role: role}, jwtSecret, {expiresIn: maxAge});
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 ,  sameSite: 'None', secure: true});
          reply = {
            success: true,
            data: token,
            message: "Logged in successfully",
            role: role,
          };
          res.status(200).json(reply)
        }
        else {
          reply = {
            success: false,
            data: null,
            message: "Password does not match",
          };
          res.status(401).json(reply)
        }
      }
  }catch(error){
    reply = {
      success: false,
      data: null,
      message: error.message,
    }
    res.status(400).json(reply);
  }
};

//Logout user
const logout = async (req,res) => {
  try{
    res.cookie("jwt", "", { maxAge: "1" });
    const reply = {
      success: true,
      data: null,
      message: "Logged out successfully",
    }
    res.status(200).json(reply);
  }catch(error){
    const reply = {
      success: false,
      data: null,
      message: error.message,
    }
    res.status(400).json(reply);
  }
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    let role;
    try{
      const user1 = await Admin.findOne({email});
      const user2 = await Pharmacist.findOne({email});
      const user3 = await Patient.findOne({email});
      const user4 = await PharmacistRequest.findOne({email});

      if(!user1 && !user2 && !user3 && !user4){
        reply = {
          success: false,
          data: null,
          message: "Email has not been registered before",
        };
        res.status(400).json(reply);
      }
      else{
        if (user1) {
          role = "Admin";
        }
        else if (user2){
          role = "Pharmacist";
        }
        else if (user4){
          role = "PharmacistRequest";
        }
        else{
          role = "Patient";
        }
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

        switch(role){
          case "Admin": await Admin.updateOne({email: email}, { $set: {otp: otp, otpExpiry: otpExpiry}}); break;
          case "Pharmacist": await Pharmacist.updateOne({email: email}, { $set: {otp: otp, otpExpiry: otpExpiry}}); break;
          case "PharmacistRequest": await PharmacistRequest.updateOne({email: email}, { $set: {otp: otp, otpExpiry: otpExpiry}}); break;
          default: await Patient.updateOne({email: email}, { $set: {otp: otp, otpExpiry: otpExpiry}}); 
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
            user: 'el7a2ni.virtual@gmail.com',
            pass: 'zijy ztiz drcn ioxq'
          }
        });
        const mailOptions = {
          from: 'el7a2ni.virtual@gmail.com',
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP for password reset is: ${otp}. The OTP will expire in 5 minutes`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reply = {
              success: false,
              data: null,
              message: error.message,
            }
            res.status(400).json(reply);
          } else {
            reply = {
              success: true,
              data: null,
              message: 'Email sent successfully',
            }
            res.status(200).json(reply);
          }
        });
      }

    } catch (error){
      reply = {
        success: false,
        data: null,
        message: error.message,
      }
      res.status(400).json(reply);
    }
};


const verifyOTP = async (req,res) => {
  const email = req.body.email;
  const otp = req.body.password;
  try{
    const user1 = await Admin.findOne({email});
    const user2 = await Pharmacist.findOne({email});
    const user3 = await Patient.findOne({email});
    const user4 = await PharmacistRequest.findOne({email});
    let flag = false;
    if (user1) {
      role = "Admin";
    }
    else if (user2){
      role = "Pharmacist";
    }
    else if (user4){
      role = "PharmacistRequest";
    }
    else{
      role = "Patient";
    }
    switch(role){
      case "Admin": if(user1.otp === otp && user1.otpExpiry > now()) {
                        flag = true;
                        await Admin.updateOne({email: email}, { $set: {otp: '', otpExpiry: ''}});                 
                    } 
                    break;
      case "Pharmacist": if(user2.otp === otp && user2.otpExpiry > now()) {
                        flag = true;
                        await Pharmacist.updateOne({email: email}, { $set: {otp: '', otpExpiry: ''}});                 
                      }
                      break;
      case "PharmacistRequest": if(user4.otp === otp && user4.otpExpiry > now()) {
                              flag = true;
                              await PharmacistRequest.updateOne({email: email}, { $set: {otp: '', otpExpiry: ''}});                 
                            }
                            break;
      default: if(user3.otp === otp && user3.otpExpiry > now()) {
                  flag = true;
                  await Patient.updateOne({email: email}, { $set: {otp: '', otpExpiry: ''}});                 
                } 
                break; 
    }
    if(flag){
      reply = {
        success: true,
        data: null,
        message: 'OTP verified',
      }
      res.status(200).json(reply);
    }
    else{
      reply = {
        success: false,
        data: null,
        message: "Invalid or expired OTP",
      }
      res.status(400).json(reply);
    }
  }catch(error){
    reply = {
      success: false,
      data: null,
      message: error.message,
    }
    res.status(400).json(reply);
  }
};


const resetPassword = async (req,res) => {
  const password = req.body.password;
  const email = req.body.email;
  console.log(password);
  console.log(email);
  try{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user1 = await Admin.findOne({email});
    const user2 = await Pharmacist.findOne({email});
    const user3 = await Patient.findOne({email});
    const user4 = await PharmacistRequest.findOne({email});
    if (user1) {
      role = "Admin";
    }
    else if (user2){
      role = "Pharmacist";
    }
    else if (user4){
      role = "PharmacistRequest";
    }
    else{
      role = "Patient";
    }
    switch(role){
      case "Admin": await Admin.updateOne({email: email}, { $set: {password: hashedPassword}}); break; 
      case "Pharmacist": await Pharmacist.updateOne({email: email}, { $set: {password: hashedPassword}}); break; 
      case "PharmacistRequest": await PharmacistRequest.updateOne({email: email}, { $set: {password: hashedPassword}}); break; 
      default: await Patient.updateOne({email: email}, { $set: {password: hashedPassword}});
    }
    reply = {
      success: true,
      data: null,
      message: 'Password has been reset successfully',
    }
    res.status(200).json(reply);
  }catch(error){
    reply = {
      success: false,
      data: null,
      message: error.message,
    }
    res.status(400).json(reply);
  }
};

module.exports = {
    registerPatient,
    registerPharmacist,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword
};