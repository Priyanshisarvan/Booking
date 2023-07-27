import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFeedback } from "../../../redux/feedbackSlice";
import { toast } from "react-toastify";



const Footer = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState("");
  const [ratings, setRatings] = useState("");

  const feedbackHandler = async (e) => {
    e.preventDefault();

    if (!comments || !ratings) {
      return toast("All fields are required");
    }
    if (!/^[a-zA-Z]/.test(comments)) {
      return toast("Comment should contain characters");
    }
    await dispatch(addFeedback({ comments, ratings }));
    setComments("");
    setRatings("");
  };

  return (
    <>
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title" style={{textAlign:"left", marginBottom:"50px"}}>contact us</h3>
                  <p className="footer_text" >
                    <i className="bi bi-geo-alt-fill"></i>&nbsp; Address : 400,
                    Prahlad Nagar, Holiday Inn, Ahmedabad, India
                  </p>
                  <p className="footer_text">
                    <i className="bi bi-envelope-fill"></i>&nbsp; Email :
                    holidayinn@gmail.com
                  </p>
                  <p className="footer_text" >
                    <i className="bi bi-telephone-fill"></i>&nbsp; Phone : +91
                    367 267 2678
                  </p>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-3">
                <div className="footer_widget" style={{display:"flex", flexDirection: "column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                  <h3 className="footer_title">About</h3>
                  <ul style={{margin:"0px", padding:"0px"}}>
                  <li style={{textAlign:"left", lineHeight: "1.5" }}>
                      <Link to="/about" style={{ textDecoration: "none" }}>
                        About Us
                      </Link>
                    </li>
                    <li style={{textAlign:"left", lineHeight: "1.5" }}>
                      <Link to="/contact" style={{ textDecoration: "none" }}>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget" style={{display:"flex", flexDirection: "column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                  <h3 className="footer_title">Navigation</h3>
                  <ul style={{margin:"0px", padding:"0px"}}>
                    <li style={{textAlign:"left"}}>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        Home
                      </Link>
                    </li>
                    <li style={{textAlign:"left"}}>
                      <Link to="/rooms" style={{ textDecoration: "none" }}>
                        Rooms
                      </Link>
                    </li>
                    <li style={{textAlign:"left"}}>
                      <Link to="/about" style={{ textDecoration: "none" }}>
                        About
                      </Link>
                    </li>
                    <li style={{textAlign:"left"}}>
                      <Link to="/booking" style={{ textDecoration: "none" }}>
                        Booking
                      </Link>
                    </li>
                    <li style={{textAlign:"left"}}>
                      <Link to="/contact" style={{ textDecoration: "none" }}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-lg-4">
                <div className="footer_widget" >
                  <h3 className="footer_title" style={{marginBottom:"50px", textAlign:"center"}}>Give Your FeedBack</h3>
                  <form className="newsletter_form" style={{ marginTop:"30px"}}>
                    <textarea
                      type="text"
                      placeholder="Enter Comment"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />

                    <div
                      className="star-rating"
                      style={{ marginTop: -30, marginBottom: -40 }}
                    >
                      <input
                        id="star-5"
                        type="radio"
                        name="rating"
                        value="5"
                        onChange={(e) => setRatings(e.target.value)}
                      />
                      <label htmlFor="star-5" title="5 stars">
                        <i className="bi bi-star-fill" aria-hidden="true"></i>
                      </label>
                      <input
                        id="star-4"
                        type="radio"
                        name="rating"
                        value="4"
                        onChange={(e) => setRatings(e.target.value)}
                      />
                      <label htmlFor="star-4" title="4 stars">
                        <i
                          className="bi bi-star-fill p-2"
                          aria-hidden="true"
                        ></i>
                      </label>
                      <input
                        id="star-3"
                        type="radio"
                        name="rating"
                        value="3"
                        onChange={(e) => setRatings(e.target.value)}
                      />
                      <label htmlFor="star-3" title="3 stars">
                        <i className="bi bi-star-fill" aria-hidden="true"></i>
                      </label>
                      <input
                        id="star-2"
                        type="radio"
                        name="rating"
                        value="2"
                        onChange={(e) => setRatings(e.target.value)}
                      />
                      <label htmlFor="star-2" title="2 stars">
                        <i
                          className="bi bi-star-fill p-2"
                          aria-hidden="true"
                        ></i>
                      </label>
                      <input
                        id="star-1"
                        type="radio"
                        name="rating"
                        value="1"
                        onChange={(e) => setRatings(e.target.value)}
                      />
                      <label htmlFor="star-1" title="1 star">
                        <i className="bi bi-star-fill" aria-hidden="true"></i>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn"
                      value="SUBMIT"
                      onClick={feedbackHandler}
                    >
                      SUBMIT
                    </button>
                  </form>
                  <p className="newsletter_text">
                    Subscribe newsletter to get updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border"></div>
            <div className="row">
              <div className="col-xl-8 col-md-7 col-lg-9">
                <p className="copy_right float-start">
                  Copyright &copy;
                  <script>document.write(new Date().getFullYear());</script> All
                  rights reserved
                </p>
              </div>
              <div className="col-xl-4 col-md-5 col-lg-3">
                <div className="socail_links">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com">
                        <i className="bi bi-facebook" style={{height:300}}></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/i/flow/login">
                        <i className="bi bi-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/accounts/login/">
                        <i className="bi bi-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>     
      </footer>
    </>
  );
};

export default Footer;
