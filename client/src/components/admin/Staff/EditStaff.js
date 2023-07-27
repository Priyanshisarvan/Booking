import React, { useState, useEffect } from "react";
import style from "../../../styles/admin-css/staff.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStaff,
  updateStaff,
  getStaffById,
} from "../../../redux/staffSlice";
import { toast } from "react-toastify";

const EditStaff = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffState = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(getAllStaff());
    dispatch(getStaffById(id));
  }, []);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(staffState?.staffById?.name);
    setAge(staffState?.staffById?.age);
    setGender(staffState?.staffById?.gender);
    setPhoneNo(staffState?.staffById?.phoneNo);
    setEmail(staffState?.staffById?.email);
    setJobRole(staffState?.staffById?.jobRole);
    setImage(staffState?.staffById?.url)
  }, [staffState?.staffById]);

  const updateHandler = async (id) => {
    if (!name || !age || !gender || !phoneNo || !email || !jobRole || !image) {
      return toast("All fields are required...");
    }
    if (!/^[A-Za-z]+$/.test(name)) {
      return toast("Name should contain characters");
    }
    if (!/^[0-9]+$/.test(phoneNo)) {
      return toast("Phone Number must contain numbers only");
    }
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return toast("Phone Number length must be 10 exact only...");
    }
    if (!/^[A-Za-z]+$/.test(jobRole)) {
      return toast("JobRole should contain characters");
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email)) {
      return toast("Invalid email");
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phoneNo", phoneNo);
    formData.append("jobRole", jobRole);
    formData.append("email", email);
    formData.append("image", image);

    await dispatch(updateStaff(formData));
    navigate("/admin/staff", { replace: true });
  };

  const cancelHandler = () => {
    navigate("/admin/staff", { replace: true });
  };

  return (
    <>
      <div className={`${style.staffContainer}  m-auto mt-5`}>
        <h4>STAFF MANAGEMENT</h4>
        <div className="row">
          <div className="col-md-12">
            <div className={`${style.formGroup1} mt-2`}>
              <input
                type="text"
                value={name}
                className={`${style.formControl1}  `}
                id="exampleInput"
                placeholder="Name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="text"
                value={age}
                className={`${style.formControl1}  `}
                id="exampleInput"
                placeholder="Age"
                autoComplete="off"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <select
                className={`${style.formControl1} `}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option className={`${style.formControl1}  `}>
                  Select Gender
                </option>
                <option className={`${style.formControl1}  `}>Female</option>
                <option className={`${style.formControl1}  `}>Male</option>
                <option className={`${style.formControl1}  `}>Others</option>
              </select>
            </div>
            <div className={`${style.formGroup1} mt-3`}>
              <input
                type="text"
                value={phoneNo}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="email"
                value={jobRole}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="Job Role"
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: -600 }}>
              Preview :
              <img src={staffState?.staffById?.url} height={100} width={100} className="mb-3" />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="file"
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                onChange={(e) => setImage(e.target.files[0])}

                multiple
              />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="email"
                value={email}
                className={`${style.formControl1}  `}
                id="exampleInput"
                autoComplete="off"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`${style.staffSubmit} mb-3 me-3 bg-dark`}
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${style.staffSubmit} mb-3 bg-success`}
              onClick={() => updateHandler(id)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditStaff;
