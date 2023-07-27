import React, { useEffect, useState } from "react";
import Header from "../../UI/Common/Header";
import Footer from "../../UI/Common/Footer";
import { deleteReserveRooms, getBookingDetailByUserId } from "../../../redux/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HelperFunction } from "../../Helper/Helper";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";
import Modal from "../Modals/Modal";

const Booking = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");
  const [data1, setData1] = useState(false);
  const name = sessionStorage.getItem("name");
  const bookingState = useSelector((state) => state.booking);

  const [canceledData, setCanceledData] = useState([]);

  useEffect(() => {
    const canceledBookings = JSON.parse(localStorage.getItem("canceledBookings")) || [];
    setCanceledData(canceledBookings);
  }, []);


  useEffect(() => {
    if (bookingState.getbookingByIdStatus === "success") {
      setData(bookingState.booking1);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [bookingState]);



  useEffect(() => {
    dispatch(getBookingDetailByUserId());
  }, [dispatch,data1]);

  useEffect(() => {
    HelperFunction();
  }, []);


  const deleteHandler = async () => {
    await dispatch(deleteReserveRooms(show));
    const canceledBooking = data.find((booking) => booking._id === show);
    const updatedCanceledData = [...canceledData, canceledBooking];
    setCanceledData(updatedCanceledData);
    localStorage.setItem("canceledBookings", JSON.stringify(updatedCanceledData));
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
  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />
            
      <Header />

      <div className="bradcam_area breadcam_bg_3 mb-5">
        <h3 style={{fontSize:50, color:'Black'}}>Booking Details</h3>
        <p style={{fontSize:30}}>
          <Link to='/' style={{textDecoration:'none',color:'white'}}> Home</Link>
          <Link to='/booking' style={{textDecoration:'none',color:'white'}}> / Booking</Link>
        </p>
      </div>

      <div className="container">
        <h4 className="float-start mt-5 mb-5" style={{ color: "#014e66" }}>
          Hello, {name}
        </h4>
      </div>  

      <div className="container" style={{ marginTop: 150 }}>
        {bookingState.isLoading && <LoadingSpinner />}

        {!bookingState.booking1.length && !bookingState.isLoading && (
          <h3 className="mt-4 text-danger">You have no Bookings....</h3>
        )}
        {!bookingState.isLoading && bookingState.booking1.length !== 0 && (
          <div>
            <table
              style={{ width: 1300 }}
              className="table m-auto mb-5 table-hover mt-5"
              id="dtBasicExample"
            >
              <thead className="table table-active">
                <tr>
                  <th>Sr No</th>
                  <th scope="col">Room Category</th>
                  <th scope="col">Type</th>
                  <th scope="col">Room Price</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data, i) => {
                  return (
                    <tr key={data._id}>
                      <td>{i + 1}</td>
                      <td>{data.roomId.roomCategoryId.roomCategory}</td>
                      <td>{data.roomId.roomType}</td>
                      <td>Rs. {data.roomId.price}</td>
                      <td>
                        {new Date(data.bookingDate).toJSON().slice(0, 10)}
                      </td>
                      <td>
                        {data.status === "Pending" && (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "red",
                              fontSize: 18,
                            }}
                          >
                            Pending
                          </span>
                        )}
                        {data.status === "Approved" && (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "green",
                              fontSize: 18,
                            }}
                          >
                            Approved
                          </span>
                        )}
                        {data.checkOutStatus === true && (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "green",
                              fontSize: 18,
                            }}
                          >
                            Completed
                          </span>
                        )}


                        {data.status === "Canceled" && (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "red",
                              fontSize: 18,
                            }}
                          >
                            Canceled
                          </span>
                        )}

                      </td>
                      <td>
                        {data.status === "Pending" && (
                          <button
                            className="btn btn-danger m-2"
                            onClick={() => handleClickOpen(data._id)}
                          >
                            Cancel
                          </button>
                        )}
                        <Link
                          to={`/viewBooking/${data._id}`}
                          className="btn btn-secondary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}


                {canceledData.map((booking, i) => {
                  return (
                    <tr key={booking._id}>
                      <td>{data.length + i + 1}</td>
                      <td>{booking.roomId.roomCategoryId.roomCategory}</td>
                      <td>{booking.roomId.roomType}</td>
                      <td>Rs. {booking.roomId.price}</td>
                      <td>
                        {new Date(booking.bookingDate).toJSON().slice(0, 10)}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: 18,
                          }}
                        >
                          Canceled
                        </span>
                      </td>
                      <td>
                      
                      </td>
                    </tr>
                  );
                })}



              </tbody>
            </table>
          </div>
        )}
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Booking;
