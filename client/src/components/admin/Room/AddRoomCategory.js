import React, { useState } from "react";
import style from "../../../styles/admin-css/staff.module.css";
import {addRoomCategory } from "../../../redux/roomCategorySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddRoomCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [roomCategory, setRoomCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!roomCategory) {
      return toast("All fields are required");
    } else {
      const d = await dispatch(addRoomCategory({ roomCategory }));
      if (d.meta.requestStatus === "fulfilled") {
        navigate("/admin/roomCategory", { replace: true });
      }
    }
  };

  const cancelHandler = () => {
    navigate("/admin/roomCategory", { replace: true });
  };
  return (
    <>
      <div className={`${style.staffContainer}  m-auto `}>
        <h4>ROOM CATEGORY MANAGEMENT</h4>
        <div className="row">
          <div className="col-md-12">
            <div className={`${style.formGroup1} mt-2`}>
              <input
                type="text"
                value={roomCategory}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="Room Category"
                onChange={(e) => setRoomCategory(e.target.value)}
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
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoomCategory;
