import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteRoomCategory,
  getAllRoomsCategory,
} from "../../../redux/roomCategorySlice";
import Modal from "../Modals/Modal";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";

const RoomCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [show, setShow] = useState("");
  const [open, setOpen] = useState(false);

  const roomCategoryState = useSelector((state) => state.roomCategory);

  useEffect(() => {
    if (roomCategoryState.getRoomCategoryStatus === "success") {
      setData(roomCategoryState.roomCategory);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [roomCategoryState]);

  useEffect(() => {
    dispatch(getAllRoomsCategory());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteRoomCategory(show));
    setShow("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(" ");
  };

  const editHandler = (id) => {
    navigate("/admin/editRoomCategory/" + id);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setShow(id);
  };

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />
      <h2>Room Category</h2>
      <Link to="/admin/addRoomCategory" style={{ marginLeft: 910 }}>
        <button className="btn btn-dark m-3">Add Room Category</button>
      </Link>

      {roomCategoryState.isLoading && <LoadingSpinner />}

      {!roomCategoryState.roomCategory.length &&
        !roomCategoryState.isLoading && (
          <h3 className="text-danger">No Data found</h3>
        )}

      {!roomCategoryState.isLoading &&
        roomCategoryState.roomCategory.length !== 0 && (
          <div>
            <table
              className="table m-auto mb-5 table-hover table-stripped"
              style={{ width: 1100 }}
              id="dtBasicExample"
            >
              <thead className=" table table-active">
                <tr>
                  <th scope="col">Sr No</th>
                  <th scope="col">RoomCategory</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, i) => {
                  return (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{data.roomCategory}</td>
                      <td>
                        <i
                          className="bi bi-pencil"
                          onClick={() => editHandler(data._id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        &nbsp; &nbsp;
                        <i
                          className="bi bi-trash-fill"
                          onClick={() => handleClickOpen(data._id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default RoomCategory;
