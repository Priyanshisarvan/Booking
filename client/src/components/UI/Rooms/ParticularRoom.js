import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoomsByCategoryId,
  getRoomsById,
} from "../../../redux/adRoomSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HelperFunction } from "../../Helper/Helper";
import Pagination from "../Pages/Pagination";

const ParticularRoomCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  const roomState = useSelector((state) => state.addRoom);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(3);

  const lastRoomIndex = currentPage * roomsPerPage;
  const firstRoomIndex = lastRoomIndex - roomsPerPage;
  const currentRooms = data.slice(firstRoomIndex, lastRoomIndex);

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    setData(roomState.room1);
  });

  useEffect(() => {
    dispatch(getRoomsByCategoryId(id));
  }, [dispatch]);

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

      <div className="bradcam_area breadcam_bg_1 mb-5" style={{ height: 530 }}>
        <h3>Rooms Page</h3>
        <div className=" mb-5">
        <p style={{ fontSize: 30, marginTop: -10 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Home
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }}>
            / Rooms
          </Link>
        </p>
      </div>
      </div>
      <br />
      <div className="offers_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100"></div>
            </div>
          </div>

          <div className="row">
            {roomState.room1.length <= 0 && <h2>No Rooms available of this</h2>}

            {roomState.room1 &&
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
                            backgroundColor:`rgba(10,30,30,1)`,
                            padding: 10,
                          }}
                        >
                          {data.price} Rs./ Night
                        </p>
                      </div>
                      <h3 style={{ marginLeft: 50, fontWeight: "bold" }}>
                        {data.roomCategoryId.roomCategory}
                      </h3>
                      <ul>
                        <li>{data.description}</li>
                        <li>
                          {data.noOfAdults} Adults & {data.noOfChildren}
                          Children size
                        </li>
                        <li>{data.roomType}</li>
                        <li className="me-4">
                          <i className="bi bi-tv me-2"></i>TV &nbsp;
                          <i className="bi bi-clipboard2 me-1"></i>
                          FRIDGE&nbsp;&nbsp;
                          <i className="bi bi-wifi me-2"></i>WIFI
                        </li>
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
              })}
          </div>
        </div>
      </div>

      <Pagination 
        totalRooms={data.length} 
        roomsPerPage={roomsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <Footer />
    </div>
  );
};

export default ParticularRoomCategory;
