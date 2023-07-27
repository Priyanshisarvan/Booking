import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingStatusUpdate,
  deleteReserveRooms,
  getBookingDetailByStatus,
  updatecheckInStatus,
  updatecheckOutStatus,
} from "../../../redux/bookingSlice";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import { HelperFunction } from "../../Helper/Helper";
import ApproveModal from "../Modals/ApproveModal";
import Modal from "../Modals/Modal";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";


const AdminBooking = () => {
  const { status } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");
  const [data1, setData1] = useState(false);
  const [show1, setShow1] = useState("");
  const [open1, setOpen1] = useState(false);

  const bookingState = useSelector((state) => state.booking);

  useEffect(() => {
    if (bookingState.getbookingDetailByStatus === "success") {
      setData(bookingState.getbookingStatusData);
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
    dispatch(getBookingDetailByStatus(status));
  }, [data1]);

  const deleteHandler = async () => {
    await dispatch(deleteReserveRooms(show));
    setShow("");
    setData1(true);
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
  const approveHandler = () => {
    dispatch(bookingStatusUpdate(show1));
    setData1(true);
    setShow1("");
    setOpen1(false);
  };
  const handleClickOpen1 = (id) => {
    setOpen1(true);
    setShow1(id);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setShow1(" ");
  };
  const checkInHandler = async (id) => {
    await dispatch(updatecheckInStatus(id));
    setData1(!data1);
  };
  const checkOutHandler = async (id) => {
    await dispatch(updatecheckOutStatus(id));
    setData1(true);
  };
  
  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />

      <ApproveModal
        open={open1}
        handleClose={handleClose1}
        deleteHandler={approveHandler}
        handleClickOpen={handleClickOpen1}
      />

      <h3>BOOKING MANAGEMENT</h3>

      {bookingState.isLoading && <LoadingSpinner />}

      {!bookingState.getbookingStatusData.length && !bookingState.isLoading && (
        <h3 className="mt-4 text-danger">No Bookings Found...</h3>
      )}
      {!bookingState.isLoading &&
        bookingState.getbookingStatusData.length !== 0 && (
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
                  <th scope="col">Status</th>
                  <th scope="col">CheckIn</th>
                  <th scope="col">CheckOut</th>
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
                      <td>
                        {new Date(data.bookingDate).toJSON().slice(0, 10)}
                      </td>
                      <td>
                        {data.status === "Approved" ? (
                          <p style={{ color: "Green", fontWeight: "bold" }}>
                            Approved
                          </p>
                        ) : (
                          <div>
                            <button
                              className="btn btn-success me-2"
                              onClick={() => handleClickOpen1(data._id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => handleClickOpen(data._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>

                      <td>
                        {data.status === "Approved" ? (
                          <div>
                            {data.checkInStatus === false ? (
                              <button
                                className="btn btn-dark me-2"
                                onClick={() => checkInHandler(data._id)}
                              >
                                checkIn
                              </button>
                            ) : (
                              <p style={{ color: "Green", fontWeight: "bold" }}>
                                CheckedIn
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <button
                              disabled
                              className="btn btn-dark me-2"
                            >
                              checkIn
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        {data.status === "Approved" &&
                        data.checkInStatus === true ? (
                          <div>
                            {data.checkOutStatus === false ? (
                              <button
                                className="btn btn-dark me-2"
                                onClick={() => checkOutHandler(data._id)}
                              >
                                checkOut
                              </button>
                            ) : (
                              <p style={{ color: "Green", fontWeight: "bold" }}>
                                CheckedOut
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <button
                              disabled
                              className="btn btn-dark me-2"
                            >
                              checkOut
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/admin/adminViewBooking/${data._id}`}
                          className="btn btn-indigo"
                        >
                          <i
                            className="bi bi-eye-fill"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </Link>
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
