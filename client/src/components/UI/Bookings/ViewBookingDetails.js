import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getBookingDetailByUserId } from "../../../redux/bookingSlice";
import { HelperFunction } from "../../Helper/Helper";
import { Link, useParams } from "react-router-dom";
import { Document } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";

const ViewBookingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const bookingState = useSelector((state) => state.booking);

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    dispatch(getBookingDetailByUserId());
  }, [dispatch, token]);

  const data = bookingState.booking1
    ? bookingState.booking1.filter((data) => data._id === id)
    : null;

  const captureScreen = () => {
    const body = document.querySelector("body");
    const screenshotOptions = {
      scale: 9,
      scrollX: 0,
      scrollY: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      useCORS: true,
    };

    html2canvas(body, screenshotOptions).then((canvas) => {
      const screenshotData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(screenshotData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("bookingPdf.pdf");
    });
  };

  return (
    <>
      {bookingState.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Document>
          <div id="myContent">
            <div
              style={{
                fontFamily: "Courier New, Courier, monospace",
              }}
              className="mt-4"
            >
              <h2 className="mt-3 ">MY HOTEL BOOKING DETAILS</h2>
            </div>
            {!bookingState.isLoading && !data.length ? (
              <p>No Data Found</p>
            ) : (
              <div className="viewBooking">
                <h3 className="float-start text-danger">Booking Details</h3>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>                      
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Customer Name :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].userId.firstName+" "+data[0].userId.lastName}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Mobile Number :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].userId.phone}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Email ID :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].userId.email}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          City :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].userId.city}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Address :
                        </TableCell>
                        <TableCell align="left" colSpan={3}>
                          {data[0].userId.address}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Check In :
                        </TableCell>
                        <TableCell align="left">{data[0].checkIn}</TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Check Out :
                        </TableCell>
                        <TableCell align="left">{data[0].checkOut}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>

                <h3 className="float-start text-danger mt-5 mb-5">
                  Room Details
                </h3>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Category :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].roomId.roomCategoryId.roomCategory}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Price (Per Day) :
                        </TableCell>
                        <TableCell align="left" colSpan={3}>
                          Rs. {data[0].roomId.price}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Type :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].roomId.roomType}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Max Adult :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].roomId.noOfAdults}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Max Child :
                        </TableCell>
                        <TableCell align="left">
                          {data[0].roomId.noOfChildren}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Image :
                        </TableCell>
                        <TableCell align="left">
                          <img
                            src={data[0].roomId.url}
                            height={130}
                            width={200}
                            alt="roomImage"
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Facilities :
                        </TableCell>
                        <TableCell align="left" colSpan={3}>
                          <i className="bi bi-tv me-2"></i>TV
                          <i className="bi bi-clipboard2 m-1"></i> FRIDGE
                          <i className="bi bi-wifi m-1"></i>WIFI
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Description :
                        </TableCell>
                        <TableCell align="left" colSpan={5}>
                          {data[0].roomId.description}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Booking Date :
                        </TableCell>
                        <TableCell align="left">
                          {new Date(data[0].bookingDate).toJSON().slice(0, 10)}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Payment Mode :
                        </TableCell>
                        <TableCell align="left">{data[0].payment}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Total Number of days :
                        </TableCell>
                        <TableCell align="left">{data[0].noOfDays}</TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Room Price (Per Day) :
                        </TableCell>
                        <TableCell align="left">
                          Rs. {data[0].roomId.price}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ fontWeight: "bold", color: "black" }}
                        >
                          Total :
                        </TableCell>
                        <TableCell align="left">
                          Rs. {data[0].noOfDays * data[0].roomId.price}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="right"
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: 20,
                          }}
                          colSpan={5}
                        >
                          Grand Total :
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          style={{ fontSize: 20 }}
                        >
                          Rs. {data[0].noOfDays * data[0].roomId.price}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>

                <h3 className="float-start text-danger mt-5 ">Admin Remark </h3>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: 18,
                          }}
                          colSpan={4}
                        >
                          Booking Final Status:
                          {data[0].status === "Pending" && (
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
                          {data[0].status === "Approved" && (
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
                          {data[0].checkOutStatus === true && (
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

                          {data[0].status === "Cancled" && (
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "red",
                                fontSize: 18,
                              }}
                            >
                              Cancled
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </div>
            )}
            <div
              style={{ marginTop: -50, marginLeft: -1500, marginBottom: 20 }}
            >
              <Link
                to="/booking"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-arrow-left"></i>BACK
              </Link>
            </div>
            <div style={{ marginLeft: -50 }}>
              {!bookingState.isLoading &&
                data[0] &&
                data[0].checkOutStatus === true && (
                  <button
                    className="btn btn-success mb-4"
                    onClick={captureScreen}
                  >
                    Print
                  </button>
                )}
            </div>
          </div>
        </Document>
      )}
    </>
  );
};

export default ViewBookingDetails;
