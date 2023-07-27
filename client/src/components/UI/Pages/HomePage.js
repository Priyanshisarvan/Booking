
import React, { useEffect, useState } from "react";
import Footer from "../../UI/Common/Footer";
import Header from "../../UI/Common/Header";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../../UI/Common/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms, getRoomsById } from "../../../redux/adRoomSlice";
import { toast } from "react-toastify";
import { HelperFunction } from "../../Helper/Helper";
import { addUserContact } from "../../../redux/userContactSlice";
import { getAllFeedback } from "../../../redux/feedbackSlice";
import Feedback from "../Common/Feedback";
import FAQSection from "./FaqSection";
import Map from "./Map";



const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const roomState = useSelector((state) => state.addRoom);
  const roomCategoryState = useSelector((state) => state.roomCategory);

  const [noOfAdults, setNoOfAdults] = useState("");
  const [noOfChildren, setNoOfChildren] = useState("");
  const [roomCatgeoryId, setRoomCategoryId] = useState("");

  const [inputVal, setInputVal] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    HelperFunction();
  }, []);

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getAllFeedback());
  }, [dispatch]);

  // const bookHandler = (id) => {
  //   dispatch(getRoomsById(id));

  //   if (token) {
  //     navigate("/bookNow/" + id, { replace: true });
  //   } else {
  //     navigate("/logsign");
  //     toast("Please Login first to book room");
  //   }
  // };

  const contactHandler = async (e) => {
    e.preventDefault();
    if (
      !inputVal.name ||
      !inputVal.email ||
      !inputVal.phone ||
      !inputVal.message
    ) {
      return toast("All Fields are required");
    }
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(inputVal.email)
    ) {
      toast.error("Invalid email");
      return;
    }
    if (inputVal.phone.length < 10 || inputVal.phone.length > 10) {
      toast.error("Invalid phone number");
      return;
    }
    await dispatch(addUserContact(inputVal));
    setInputVal({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
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
      <Slider />

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

      <div className="about_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5" data-aos="fade-right">
              <div className="about_info">
                <div className="section_title mb-20px">
                  <h4 className="text-info">About Us</h4>
                  <h3>
                    Joy of travel for all At Holiday Inn Hotel & Resort
                    <br />
                  </h3>
                </div>
                <p>
                  we pride ourselves in delivering warm and welcoming
                  experiences for guests staying for business or pleasure.
                  Whether it's time with friends, family, colleagues or clients
                  we have a breadth of hotels from urban centres to beach
                  resorts offering environments, services and amenities that
                  make it easy to work, rest and connect..
                </p>
              </div>
            </div>
            {/* <div className="col-xl-7 col-lg-7" data-aos="fade-left">
              <div className="about_thumb d-flex">
                <div className="img_1">
                  <img src="images/about/about_1.png" alt="" />
                </div>
                <div className="img_2">
                  <img src="images/about/about_2.png" alt="" />
                </div>
              </div>
            </div> */}

            <div className="col-xl-7 col-lg-7">
              <div className="about_thumb d-flex">
                <div className="img_1">
                  <img src="images/rooms/About us1.jpg" alt="" />
                </div>
                {/* <div className="img_2">
                  <img src="images/about/about_2.png" alt="" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="offers_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <h3 className="mt-5">Our Rooms</h3>
              </div>
              <Link to="/rooms" style={{ marginTop: -100 }}>
                <button className="btn btn-dark float-end">View All</button>
              </Link>
            </div>
          </div>

          <div className="row">
            {roomState.allRoom &&
              roomState.allRoom.map((data, i) => {
                if (i < 3) {
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
                          {/* <li>
                            {data.noOfAdults} Adults & {data.noOfChildren}{" "}
                            Children size
                          </li>
                          <li>{data.roomType}</li> 
                          <i className="bi bi-tv me-2"></i>TV &nbsp;
                          <i className="bi bi-clipboard2 me-1"></i>{" "}
                          FRIDGE&nbsp;&nbsp;
                          <i className="bi bi-wifi me-2"></i>WIFI */}
                        </ul>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>    

      <br />
      <br />

      <section
        style={{
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#dfa974",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "50px",
            borderTop: "1px solid lightgray",
            paddingTop: "60px",
          }}
        >
          <span style={{ "font-size": "16px" }}>What We Do</span>
          <div class="row">
            <div
              style={{
                fontSize: "44px",
                color: "#19191a",
                lineHeight: "58px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <h2>Discover Our Services</h2>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "15%", marginTop: "5%", marginRight: "12%" }}>
          <div class="row">
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "10px", borderBlock: "1px solid", padding:"10px" }}>
                <h4>Parking</h4>
                <p>
                  We offer valet parking services, where a staff member will
                  park and retrieve your vehicle for you. If you prefer not to
                  worry about finding parking yourself.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "10px", borderBlock: "1px solid", padding:"10px" }}>
                <i class="flaticon-033-dinner"></i>
                <h4>Spa and Wellness Services</h4>
                <p>
                  We provide spa and wellness services such as massages,
                  facials, body treatments, saunas, steam rooms, and relaxation
                  areas.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "10%", borderBlock: "1px solid", padding:"10px" }}>
                <i class="flaticon-026-bed"></i>
                <h4>Conference/Meeting Facilities</h4>
                <p>
                  We offer conference rooms, meeting spaces, or banquet halls
                  for business meetings, conferences, events, or social
                  gatherings.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "40px", borderBlock: "1px solid", padding:"10px" }}>
                <i class="flaticon-024-towel"></i>
                <h4>Laundry</h4>
                <p>
                  We offer laundry and dry cleaning services for guests who need
                  their clothes cleaned or pressed. We Provide two types of
                  laundry services: self-service and full-service.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "10px", borderBlock: "1px solid" , padding:"10px"}}>
                <i class="flaticon-044-clock-1"></i>
                <h4>Fitness Facilities</h4>
                <p>
                  We have Gym or fitness centers equipped with exercise
                  machines, weights, and sometimes swimming pools or sports
                  facilities.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6">
              <div style={{ marginBottom: "10px", borderBlock: "1px solid", padding:"10px" }}>
                <i class="flaticon-012-cocktail"></i>
                <h4>Bar &amp; Drink</h4>
                <p>
                  We have on-site bars where guests can enjoy meals, snacks, or
                  beverages. This can range from casual dining to fine dining
                  options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-sec sec-pad ">
        <div className="container">
          <div className="row">
            <div
              className="col-md-8"
              // style={{ marginRight: "70%" }}
            >
              <div className="contact-detail" style={{ color: "white", textAlign:"revert", paddingRight:"200px" }}>
                <h1 className="section-title text-light">Contact us</h1>

                <ul className="contact-ul">
                  <li>
                    <i className="bi bi-geo-alt-fill"></i>&nbsp; Address : 400,
                    Prahlad Nagar, Holiday Inn, Ahmedabad, India
                  </li>

                  <li>
                    <i
                      className="bi bi-envelope-fill"
                      style={{ marginLeft: -120 }}
                    ></i>
                    &nbsp; Email : holidayinn@gmail.com
                  </li>

                  <li>
                    <i
                      className="bi bi-telephone-fill"
                      style={{ marginLeft: -120 }}
                    ></i>
                    &nbsp; Phone : +10 367 267 2678
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="col-md-4 "
            >
              <div>
                <div className="contact-form">
                  <div className="form-detail" style={{display: "flex", columnGap: "20px"}}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="inptFld"
                      value={inputVal.name}
                      onChange={setVal}
                      autoComplete={"off"}
                      required
                      style={{width: "100%"}}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="inptFld"
                      maxLength={10}
                      minLength={10}
                      required
                      value={inputVal.phone}
                      onChange={setVal}
                      autoComplete={"off"}
                      style={{width: "100%"}}
                    />
                  </div>
                  <div className="form-detail">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="inptFld"
                      value={inputVal.email}
                      onChange={setVal}
                      autoComplete={"off"}
                      required
                      style={{width: "100%"}}
                    />
                  </div>
                  <div className="form-detail">
                    <textarea
                      className="inptFld"
                      rows=""
                      cols=""
                      name="message"
                      value={inputVal.message}
                      onChange={setVal}
                      placeholder="Your Message..."
                      autoComplete={"off"}
                      required
                      style={{width: "100%", paddingTop: "10px"}}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <input
                      type="submit"
                      name="submit"
                      value="SEND"
                      className="inptBtn btn btn-dark"
                      autoComplete={"off"}
                      onClick={contactHandler}
                    />
                  </div>
                </div>
              </div>

              {/* <form>
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="inptFld"
                      value={inputVal.name}
                      onChange={setVal}
                      autoComplete={"off"}
                      required
                    />
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="inptFld"
                      maxLength={10}
                      minLength={10}
                      required
                      value={inputVal.phone}
                      onChange={setVal}
                      autoComplete={"off"}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="inptFld"
                      value={inputVal.email}
                      onChange={setVal}
                      autoComplete={"off"}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <textarea
                      className="inptFld"
                      rows=""
                      cols=""
                      name="message"
                      value={inputVal.message}
                      onChange={setVal}
                      placeholder="Your Message..."
                      autoComplete={"off"}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <input
                      type="submit"
                      name="submit"
                      value="SEND"
                      className="inptBtn btn btn-dark"
                      autoComplete={"off"}
                      onClick={contactHandler}
                    />
                  </div>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </section>
      <br />

      <Feedback />

      <br />
      <br />
      {/* <div className="instragram_area">
        <div className="single_instagram">
          <img
            src="images/rooms/visualsofdana-T5pL6ciEn-I-unsplash.jpg"
            alt=""
            height={343}
          />
          <div className="ovrelay">
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="single_instagram">
          <img
            src="images/rooms/sasha-kaunas-67-sOi7mVIk-unsplash.jpg"
            alt=""
            height={343}
          />
          <div className="ovrelay">
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="single_instagram">
          <img
            src="images/rooms/erick-palacio-_B9J6abAHPA-unsplash.jpg"
            alt=""
            height={343}
          />
          <div className="ovrelay">
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="single_instagram">
          <img
            src="images/rooms/ralph-ravi-kayden-FqqiAvJejto-unsplash.jpg"
            alt=""
            height={343}
          />
          <div className="ovrelay">
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="single_instagram">
          <img
            src="images/rooms/sasha-kaunas-67-sOi7mVIk-unsplash.jpg"
            alt=""
            height={343}
          />
          <div className="ovrelay">
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </div> */}
      {/* <Chatbot
        config={config}
        messageParser={messageParser}
        actionProvider={actionProvider}
      /> */}
      {/* <Chatbot /> */}

      <FAQSection />

      <Map />

      <Footer />
    </div>
  );
};

export default HomePage;

