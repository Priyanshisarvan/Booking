const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv");

const createToken = async (id) => {
  try {
    const jwtkey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ _id: id }, jwtkey);
    return token;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const funcToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decode._id;
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      requireTLS: true,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    console.log();
    const mailOptions = {
      from: "pmsarvan111101@gmail.com",
      to: email,
      subject: "For Reset Password",
      html:
        "<p>Hello " +
        ',please click on the link and <a href="http://localhost:3000/resetPassword?token=' +
        token +
        '">Reset your password</a></p>',
    };


    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent -", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const sentVerifyMail = async (name, email, userId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: "pmsarvan111101@gmail.com",
      to: email,
      subject: "For verification mail",
      html:
        "<p>Hii " +
        name +
        ',please click here to <a href="http://localhost:4000/user/verify?id=' +
        userId +
        '">Verify</a> your mail</p>',
    };


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent -", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyMail = async (req, res) => {
  try {
    const verify = await userModel.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: true } }
    );
    if (verify) {
      res.status(200).json("Your are Verified to login");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      city,
      address,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !city ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json("All fields are required...");
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json("Email must be valid email");
    }

    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json("Phone number length must be 10");
    }

    if (password !== confirmPassword) {
      return res.status(400).json("Password and Confirm password must be same");
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json(
          "Password must contain one capital letter ,one small letter ,one symbol,numbers and total 8 characters length"
        );
    }
    const spassword = await securePassword(password);

    let user = await userModel.findOne({ email });
    if (user) {
      if (user.isStatus) {
        return res.status(400).json("Access Denied...");
      }
      if (!user.isStatus) {
        return res.status(400).json("This user is already exist...");
      }
    } else {
      const newUser = new userModel({
        firstName,
        lastName,
        phone,
        city,
        address,
        email,
        password: spassword,
      });

      const userData = await newUser.save();
      if (userData) {
        sentVerifyMail(req.body.firstName, req.body.email, userData._id, userData.otp);
        return res.status(201).json({
          message: "Registered Successfully....to login First Verify the email...",

        });        
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
    let userData = await userModel.findOne({ email });
    if (userData) {
      if (userData.isStatus) {
        return res.status(400).json("Access Denied");
      }
    }
    if (!userData) {
      return res
        .status(400)
        .json("You are not registered...Please first register to login");
    }
    const passwordMatch = await bcryptjs.compare(password, userData.password);

    if (passwordMatch && userData.is_admin) {
      const tokenData = await createToken(userData._id);
      const adminData = {
        _id: userData._id,
        name: userData.firstName,
        phone: userData.phone,
        email: userData.email,
        token: tokenData,
        is_admin: userData.is_admin,
      };
      return res.status(201).json({
        success: true,
        message: "Admin Logged In Successfully...",
        data: adminData,
      });
    }
    if (userData.is_verified === true) {
      const passwordMatch = await bcryptjs.compare(password, userData.password);

      if (!passwordMatch) {
        return res.status(400).json("Invalid Email Or Password");
      }
      if (passwordMatch) {
        const tokenData = await createToken(userData._id);
        const userResult = {
          _id: userData._id,
          name: userData.firstName,
          phone: userData.phone,
          email: userData.email,
          token: tokenData,
        };
        const response = {
          success: true,
          message: "User Logged In Successfully...",
          data: userResult,
        };

        res.status(200).send(response);
      } else {
        return res.status(200).json("Invalid Login Credentials");
      }
    } else {
      return res
        .status(400)
        .json(
          "Email is not verified...Please verify email then try to login again..."
        );
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find({ isStatus: false });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const getUserByTokenId = async (req, res) => {
  try {
    const userId = funcToken(req, res);
    const user = await userModel.findById(userId);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const { firstName, lastName, phone, city, address, email } = req.body;

  if (
    firstName === "" ||
    lastName === "" ||
    phone === "" ||
    email === "" ||
    city === "" ||
    address === ""
  ) {
    return res.status(400).json("All fields are required...");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json("Email must be valid email");
  }

  if (phone.length < 10 || phone.length > 10) {
    return res.status(400).json("Phone Number length must be exactly 10");
  }

  userModel.findOne({ _id: id }).then(async (userId) => {
    if (userId) {
      const updateData = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        city: city,
        address: address,
        email: email,
      };

      const userInfo = await userModel.updateOne(
        { _id: id },
        { $set: updateData }
      );

      if (userInfo) {
        res.status(200).json({
          message: "Your profile updated successfully...",
        });
      }
    } else {
      res.status(200).json({
        message: "This user does not exist...",
      });
    }
  });
};

const logoutUser = async (req, res) => {
  const userId = funcToken(req, res);

  const user = await userModel.findByIdAndUpdate(userId, {
    $set: { token: "" },
  });

  if (user) {
    res.status(200).json({
      message: "Logged Out Successfully...",
    });
  } else {
    res.status(400).json({
      message: "Error occured while user logged out",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const data = await userModel.findOne({email});
    if (data.email === email) {
      const randomString = randomstring.generate();
      console.log(randomString);
      const userData = await userModel.updateOne(
        { email: email },
        { $set: { tempKey: randomString } }
      );

      sendResetPasswordMail(userData.firstName, email, randomString);

      res.status(200).send({
        success: true,
        message: "Please check your inbox of mail and reset your password",
      });
    } else {
      res.status(400).send({ message: "Invalid Email..." });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const tokenData = await userModel.findOne({ tempKey: token });
    if (tokenData) {
      const password = req.body.password;
      const newPassword = await securePassword(password);
      const userData = await userModel.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, tempKey: "" } },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message:
          "User password has been reset successfully...Please Login again",
        data: userData,
      });
    } else {
      res
        .status(200)
        .send({ success: true, message: "This link has been expired." });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  const { deleteReason } = req.body;

  userModel.findOne({ _id: id }).then(async (userId) => {
    if (userId) {
      if (deleteReason) {
        await userModel
          .updateOne(
            { _id: id },
            { $set: { isStatus: true, deleteReason: req.body.deleteReason } }
          )
          .then(() => {
            res.status(200).json({
              message: "User Deleted Successfully...",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: `An Error Occured while deleting user: ${error}`,
            });
          });
      } else {
        res.status(400).json({
          message: "Please provide a reason for deleting user",
        });
      }
    } else {
      res.status(400).json({
        message: "User does not exist...",
      });
    }
  });
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await userModel.aggregate([
      {
        $match: {
          isStatus: {
            $eq: false,
          },
        },
      },
      {
        $group: {
          _id: "userCount",
          totalUser: {
            $sum: {
              $cond: [{ $eq: ["$is_admin", false] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json(userCount);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  verifyMail,
  forgotPassword,
  resetPassword,
  deleteUser,
  getUserCount,
  getUserByTokenId,
  updateUser,
};
