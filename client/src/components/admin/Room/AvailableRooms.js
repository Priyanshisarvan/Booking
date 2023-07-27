import React, { useEffect, useState } from "react";
import "../../../styles/admin-css/room.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, getAvailableRooms } from "../../../redux/adRoomSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../Modals/Modal";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import { HelperFunction } from "../../Helper/Helper";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";

const AvailableRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [show, setShow] = useState("");
  const [open, setOpen] = React.useState(false);

  const roomState = useSelector((state) => state.addRoom);

  useEffect(() => {
    if (roomState.getAvailableRoomsStatus === "success") {
      setData(roomState?.getAvailableRooms);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [roomState]);

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    dispatch(getAvailableRooms());
  }, []);

  const editHandler = (id) => {
    navigate("/admin/editRoom/" + id);
  };

  const deleteHandler = () => {
    dispatch(deleteRoom(show));
    setShow("");
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setShow(id);
  };

  const handleClose = () => {
    setOpen(false);
    setShow(" ");
  };

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />

      <h3 className="mb-5">AVAILABALE ROOMS</h3>

      {roomState.isLoading && <LoadingSpinner />}
      {!roomState.getAvailableRooms.length && !roomState.isLoading && (
        <h3 className="text-danger">No Data found</h3>
      )}

      {!roomState.isLoading && roomState.getAvailableRooms.length !== 0 && (
        <div>
          <table
            className="table m-auto mb-5 table-hover"
            style={{ width: 1100 }}
            id="dtBasicExample"
          >
            <thead className=" table table-active">
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">RoomCategory</th>
                <th scope="col">RoomType</th>
                <th scope="col">Price</th>
                <th scope="col">No of Adults</th>
                <th scope="col">No of Children</th>
                <th scope="col">Facilities</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.roomCategoryId.roomCategory}</td>
                    <td>{data.roomType}</td>
                    <td>{data.price}</td>
                    <td>{data.noOfAdults}</td>
                    <td>{data.noOfChildren}</td>
                    <td>TV,FRIDGE,WIFI</td>
                    <td>{data.description}</td>
                    <td>
                      <img
                        src={data.url}
                        height={100}
                        width={100}
                        alt="RoomImage"
                      />
                    </td>
                    <td>
                      <i
                        className="bi bi-pencil"
                        onClick={() => editHandler(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      &nbsp;&nbsp;
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
      <br />
    </div>
  );
};

export default AvailableRoom;
