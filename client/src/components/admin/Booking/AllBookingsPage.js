import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookingDetails,
  deleteBookedDetails,
} from "../../../redux/bookingSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import { HelperFunction } from "../../Helper/Helper";
import Modal from "../Modals/Modal";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";

const AdminBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");

  const bookingState = useSelector((state) => state.booking);

  useEffect(() => {
    if (bookingState.getbookedDataStatus === "success") {
      setData(bookingState.bookedData);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [bookingState]);

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    dispatch(getAllBookingDetails());
  }, []);

  const deleteHandler = async () => {
    await dispatch(deleteBookedDetails(show));
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

  const viewBooking = (id) => {
    navigate("/admin/adminViewBooking/" + id);
  };
  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />

      <h3 className="mb-5">ALL BOOKING RECORDS</h3>

      {bookingState.isLoading && <LoadingSpinner />}

      {!bookingState.bookedData.length && !bookingState.isLoading && (
        <h3 className="mt-4 text-danger">No Bookings found....</h3>
      )}

      {!bookingState.isLoading && bookingState.bookedData.length !== 0 && (
        <div>
          <table
            style={{ width: 800 }}
            className="table m-auto mb-5 table-hover"
            id="dtBasicExample"
          >
            <thead className="table table-active">
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Email</th>
                <th scope="col">RoomCategory</th>
                <th scope="col">Type</th>
                <th scope="col">NoOfAdults</th>
                <th scope="col">NoOfChildren</th>
                <th scope="col">CheckIn</th>
                <th scope="col">CheckOut</th>
                <th scope="col">BookingDate</th>
                <th scope="col">Action</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.userId.email}</td>
                    <td>{data.roomId.roomCategoryId.roomCategory}</td>
                    <td>{data.roomId.roomType}</td>
                    <td>{data.noOfAdults}</td>
                    <td>{data.noOfChildren}</td>
                    <td>{data.checkIn}</td>
                    <td>{data.checkOut}</td>
                    <td>{new Date(data.bookingDate).toJSON().slice(0, 10)}</td>
                    <td>
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => handleClickOpen(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => viewBooking(data._id)}
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
    </>
  );
};

export default AdminBooking;
