const staffModel = require("../models/staffModel");
const validator = require("validator");
require("dotenv");
const cloudinary = require("../utils/cloudinary");

const addStaff = async (req, res) => {
  const { name, age, gender, phoneNo, jobRole, email } = req.body;

  if (!name || !age || !gender || !phoneNo || !jobRole || !email) {
    return res.status(400).json("All fields are required");
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json("Email must be valid");
  }
  if (phoneNo.length < 10 || phoneNo.length > 10) {
    return res.status(400).json("Phone number length must be 10");
  }

  staffModel.findOne({ email: email }).then(async (staff) => {
    if (staff) {
      if (staff.isStatus === false) {
        res.json("This staff member already exist...");
      }
      if (staff.isStatus === true) {
        await staffModel
          .updateOne({ _id: staff.id }, { $set: { isStatus: false } })
          .then(() => {
            res.status(201).json({
              message: "Staff Added Successfully...",
            });
          });
      }
    } else {
      try {
        const result = await cloudinary.uploader.upload(req.files[0].path, {
          folder: "staffImage",
          use_filename: true,
          unique_filename: false,
        });

        let staffInsert = new staffModel({
          name: name,
          age: age,
          gender: gender,
          phoneNo: phoneNo,
          email: email,
          jobRole: jobRole,
          cloudinaryId: result.public_id,
          url: result.url,
        });

        await staffInsert.save();

        res.status(201).json({
          message: "Staff Added Successfully",
        });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

const getAllStaff = async (req, res, next) => {
  try {
    const staff = await staffModel.find({ isStatus: false });
    const staff2 = staff.sort((x, y) => {
      return y.createdAt - x.createdAt;
    });

    if (staff2) {
      res.status(200).send(staff2);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStaff = async (req, res) => {
  const id = req.params.staffId;

  try {
    staffModel.findOne({ _id: id }).then(async (staffId) => {
      if (staffId) {
        await staffModel
          .updateOne({ _id: staffId.id }, { $set: { isStatus: true } })
          .then(() => {
            res.status(200).json({
              message: "Staff Deleted successfully...",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: `An Error Occured while deleting user: ${error}`,
            });
          });
      } else {
        res.status(400).json({
          message: "Staff does not exist...",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: `Error occur while deleting staff...${error}`,
    });
  }
};

const updateStaff = async (req, res, next) => {
  const id = req.params.staffId;
  const { name, age, gender, phoneNo, email, jobRole } = req.body;
  

  staffModel.findOne({ _id: id }).then(async (staffId) => {
    if (staffId) {
      const updateData = {
        name: name,
        age: age,
        gender: gender,
        phoneNo: phoneNo,
        email: email,
        jobRole: jobRole,
      };

      const staffInfo = await staffModel.updateOne(
        { _id: id },
        { $set: updateData }
      );

      if (staffInfo) {
        res.status(200).json({
          message: "Staff Updated Successfully...",
        });
      }
    } else {
      res.status(400).json({
        message: "Staff does not exist...",
      });
    }
  });
};

const getStaffCount = async (req, res) => {
  try {
    const staff = await staffModel.find();
    const totalStaff = staff
      .filter((data) => {
        return data.isStatus === false;
      })
      .sort((x, y) => {
        return y.createdAt - x.createdAt;
      }).length;

    res.status(200).json(totalStaff);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStaffById = async (req, res) => {
  try {
    const staff = await staffModel.findById(req.params.staffId);

    if (staff) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({
        message: "No Data Found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  deleteStaff,
  updateStaff,
  getStaffCount,
  getStaffById,
};
