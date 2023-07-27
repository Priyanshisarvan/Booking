import React, { useState, useEffect } from "react";
import style from "../../../styles/admin-css/staff.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomsById, updateRoom } from "../../../redux/adRoomSlice";
import { getAllRoomsCategory } from "../../../redux/roomCategorySlice";

const EditRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomCategoryState = useSelector((state) => state.roomCategory);
  const roomState = useSelector((state) => state.addRoom);

  useEffect(() => {
    dispatch(getAllRoomsCategory());
  }, []);

  const [roomCategoryId, setRoomCategoryId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [noOfAdults, setNoOfAdults] = useState("");
  const [noOfChildren, setNoOfChildren] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getRoomsById(id));
  }, []);

  useEffect(() => {
    setRoomCategoryId(roomState?.roomById?.roomCategoryId);
    setRoomType(roomState?.roomById?.roomType);
    setPrice(roomState?.roomById?.price);
    setDescription(roomState?.roomById?.description);
    setNoOfAdults(roomState?.roomById?.noOfAdults);
    setNoOfChildren(roomState?.roomById?.noOfChildren);
  }, [roomState?.roomById]);

  const updateHandler = async (id) => {
    const formData = new FormData();
    if (
      !roomCategoryId ||
      !roomType ||
      !price ||
      !description ||
      !noOfAdults ||
      !noOfChildren 
    ) {
      return toast("All fields are required");
    }
    if (!/^[0-9]+$/.test(price)) {
      return toast("Price must contain numbers only");
    }
    formData.append("id", id);
    formData.append("roomCategoryId", roomCategoryId);
    formData.append("roomType", roomType);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("noOfAdults", noOfAdults);
    formData.append("noOfChildren", noOfChildren);
    formData.append("image", image);

    await dispatch(updateRoom(formData));
    navigate("/admin/room", { replace: true });
  };

  const cancelHandler = () => {
    navigate("/admin/room", { replace: true });
  };
  return (
    <>
      <div className={`${style.staffContainer}  m-auto mt-5`}>
        <h4>ROOM MANAGEMENT</h4>
        <div className="row">
          <div className="col-md-12">
            <div className={`${style.formGroup1} mt-2`}>
              <select
                className={`${style.formControl1} `}
                onChange={(e) => setRoomCategoryId(e.target.value)}
              >
                <option className={`${style.formControl1}  `}>
                  -- Select Room Category --
                </option>
                {roomCategoryState.roomCategory.map((data) => (
                  <option key={data._id} value={data._id}>
                    {data.roomCategory}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className={`${style.formControl1} `}
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option className={`${style.formControl1}  `}>
                  Select Room Type
                </option>
                <option className={`${style.formControl1}  `}>AC</option>
                <option className={`${style.formControl1}  `}>NON AC</option>
              </select>
            </div>

            <div className={`${style.formGroup1} mt-3`}>
              <input
                type="text"
                value={price}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={`${style.formGroup1}`}>
              <input
                type="text"
                value={description}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="number"
                value={noOfAdults}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="noOfAdults"
                onChange={(e) => setNoOfAdults(e.target.value)}
              />
            </div>

            <div className={`${style.formGroup1} mt-3`}>
              <input
                type="number"
                value={noOfChildren}
                className={`${style.formControl1}  `}
                autoComplete="off"
                id="exampleInput"
                placeholder="noOfChildren"
                onChange={(e) => setNoOfChildren(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: -600 }}>
              Preview :
              <img src={roomState?.roomById?.url} height={100} width={100} className="mb-3" />
            </div>
            <div className={`${style.formGroup1}`}>
              <input
                type="file"
                className={`${style.formControl1}  `}
                id="exampleInput"
                onChange={(e) => setImage(e.target.files[0])}
                multiple
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

export default EditRoom;
