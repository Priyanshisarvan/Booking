import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRoomsByCategoryId, getRoomsById } from "../../../redux/adRoomSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { HelperFunction } from "../../Helper/Helper";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import Pagination from "../Pages/Pagination";

const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [noOfAdults, setNoOfAdults] = useState("");
  const [noOfChildren, setNoOfChildren] = useState("");
  const [roomCatgeoryId, setRoomCategoryId] = useState("");

  const roomState = useSelector((state) => state.addRoom);
  const roomCategoryState = useSelector((state) => state.roomCategory);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(3);

  const handleChange = (event) => {
    dispatch(getRoomsByCategoryId(event.target.value));
  };

  useEffect(() => {
    setData(roomState.room1);
  });

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    dispatch(getRoomsByCategoryId("All"));
  }, [dispatch]);

  const lastRoomIndex = currentPage * roomsPerPage;
  const firstRoomIndex = lastRoomIndex - roomsPerPage;
  const currentRooms = data.slice(firstRoomIndex, lastRoomIndex);

  const bookHandler = (id) => {
    dispatch(getRoomsById(id));
    if (token) {
      navigate("/bookNow/" + id, { replace: true });
    } else {
      navigate("/logsign");
      toast("Please Login first to book room");
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();

    if (!noOfAdults) {
      return toast("Please, Enter number of adults");
    }
    if (noOfAdults < 1) {
      return toast("Please, Enter valid number of adults");
    }
    if (noOfChildren < 0) {
      return toast("Please, Enter valid number of childrens");
    }
    navigate(
      `/searchRooms/${noOfAdults}/${
        noOfChildren ? noOfChildren : 0
      }/${roomCatgeoryId}`,
      {
        replace: true,
      }
    );
  };
  return (
    <div>
      <Header />
      <div className="bradcam_area breadcam_bg_1 mb-5">
        <p style={{ fontSize: 30, marginTop: -50 }}>
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
      <div className="about_area a1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12" data-aos="fade-right">
              <h3 className="text-light">SEARCH ROOMS</h3>

              <div className="searchRoom p-5 m-auto">
                <form>
                  <input
                    type="number"
                    placeholder={"Adults"}
                    className="inputSearch"
                    value={noOfAdults}
                    min={1}
                    onChange={(e) => setNoOfAdults(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder={"Children"}
                    className="inputSearch"
                    value={noOfChildren}
                    min={0}
                    onChange={(e) => setNoOfChildren(e.target.value)}
                  />
                  <select
                    className="inputSearch"
                    onChange={(e) => setRoomCategoryId(e.target.value)}
                  >
                    <option>
                      Select Room Category
                    </option>
                    {roomCategoryState.roomCategory.map((data) => (
                      <option value={data._id} key={data._id}>
                        {data.roomCategory}
                      </option>
                    ))}
                  </select>
                  <input
                    type="submit"
                    value="SEARCH"
                    className="w-100 btnSearch"
                    onClick={searchHandler}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="offers_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <h6 style={{ marginLeft: 1100, fontWeight: "bold" }}>
                Search Room Category
              </h6>
              <div
                className="section_title text-center mb-95 w-50 float-end"
                style={{ maxWidth: 200 }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-controlled-open-select-label">
                    Room Category
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    label="Room Category"
                    onChange={handleChange}
                    defaultValue="All"
                  >
                    <MenuItem value="All">
                      All
                    </MenuItem>
                    {roomCategoryState.roomCategory.map((data) => (
                      <MenuItem value={data._id} key={data._id}>{data.roomCategory}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="row">
            {roomState.isLoading ? (
              <LoadingSpinner />
            ) : !roomState.room1.length ? (
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
                          {data.noOfAdults} Adults & {data.noOfChildren} Children size
                        </li>
                        <li>{data.roomType}</li>
                        <i className="bi bi-tv me-2"></i>TV &nbsp;
                        <i className="bi bi-clipboard2 me-1"></i>
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
        totalRooms={data.length} 
        roomsPerPage={roomsPerPage} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <Footer />
    </div>
  );
};

export default Rooms;
