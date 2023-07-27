import React, { useState, useEffect } from "react";
import style from "../../../styles/admin-css/staff.module.css";
import {
  getRoomsCategoryById,
  updateRoomCategory,
} from "../../../redux/roomCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoomCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomCategoryState = useSelector((state) => state.roomCategory);

  useEffect(() => {
    dispatch(getRoomsCategoryById(id));
  }, []);

  const [roomCategory, setRoomCategory] = useState(
    roomCategoryState?.roomCategoryById?.roomCategory
  );

  useEffect(() => {
    setRoomCategory(roomCategoryState?.roomCategoryById?.roomCategory);
  }, [roomCategoryState?.roomCategoryById]);

  const updateHandler = async (id) => {
    if (!roomCategory) {
      return toast("All fields are required");
    } else {
      await dispatch(updateRoomCategory({ id, roomCategory }));
      navigate("/admin/roomCategory", { replace: true });
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

export default EditRoomCategory;
