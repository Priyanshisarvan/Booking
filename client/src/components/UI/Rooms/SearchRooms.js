import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsById, getSearchedRooms } from "../../../redux/adRoomSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../Common/LoadingSpinner";
import { toast } from "react-toastify";
import { HelperFunction } from "../../Helper/Helper";
import Pagination from "../Pages/Pagination";

const SearchRooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const { noOfAdults, noOfChildren, roomCategoryId } = useParams();
  const data = { noOfAdults, noOfChildren, roomCategoryId };

  const roomState = useSelector((state) => state.addRoom);

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    setData1(roomState.getSearchedRooms);
  });

  useEffect(() => {
    dispatch(getSearchedRooms(data));
  }, [dispatch]);

  const [data1, setData1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(3);

  const lastRoomIndex = currentPage * roomsPerPage;
  const firstRoomIndex = lastRoomIndex - roomsPerPage;
  const currentRooms = data1.slice(firstRoomIndex, lastRoomIndex);

  const bookHandler = (id) => {
    dispatch(getRoomsById(id));

    if (token) {
      navigate("/bookNow/" + id, { replace: true });
    } else {
      navigate("/");
      toast("Please Login first to book room");
    }
  };
  return (
    <div>
      <Header />

      <div className="bradcam_area breadcam_bg_1 mb-5">
        <h3>Our Rooms</h3>
        <p style={{ fontSize: 30 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Home
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none", color: "white" }}>
            / Rooms
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }}>
            / SearchRooms
          </Link>
        </p>
      </div>
      <div className="offers_area">
        <div className="container">
          <div className="row">
            {roomState.isLoading ? (
              <LoadingSpinner />
            ) : !roomState.getSearchedRooms.length ? (
              <h2 className="mb-3 text-danger">No Data Found</h2>
            ) : (
              currentRooms.map((data, i) => {
                return (
                  <div className="col-xl-4 col-md-4 p-3" key={data._id}>
                    <div className="single_offers">
                      <div className="about_thumb">
                        <img
                          src={data.url}
                          height={320}
                          width={100}
                          alt="RoomImage"
                        />
                        <p
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            position: "relative",
                            marginTop: -30,
                            float: "right",
                            backgroundColor: `rgba(10,30,30,1)`,
                            padding: 10,
                          }}
                        >
                          {data.price} Rs./ Day
                        </p>
                      </div>
                      <h3 style={{ marginLeft: 80, fontWeight: "bold" }}>
                        {data.roomCategoryId.roomCategory}
                      </h3>
                      <ul>
                        <li>{data.description}</li>
                        <li>
                          {data.noOfAdults} Adults & {data.noOfChildren}{" "}
                          Children size
                        </li>
                        <li>{data.roomType}</li>
                        <i className="bi bi-tv me-2"></i>TV &nbsp;
                        <i className="bi bi-clipboard2 me-1"></i>{" "}
                        FRIDGE&nbsp;&nbsp;
                        <i className="bi bi-wifi me-2"></i>WIFI
                      </ul>
                      <button
                        className="book_now w-100"
                        onClick={() => bookHandler(data._id)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Pagination
        totalRooms={data1.length}
        roomsPerPage={roomsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
};

export default SearchRooms;
