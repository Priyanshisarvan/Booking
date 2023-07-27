import React, { useEffect } from "react";
import Header from "../../UI/Common/Header";
import Footer from "../../UI/Common/Footer";
import { HelperFunction } from "../../Helper/Helper";
import StaffData from "../Common/StaffData";
import Feedback from "../Common/Feedback";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    HelperFunction();
  }, []);

  return (
    <div>
      <Header />
      <div className="bradcam_area breadcam_bg mb-5">
        <h3>About Holiday Inn</h3>
        <p style={{ fontSize: 30 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            
            Home
          </Link>
          <Link to="/about" style={{ textDecoration: "none", color: "white" }}>
            
            / About
          </Link>
        </p>
      </div>
      <div className="about_area" style={{ marginTop: -70 }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="about_info">
                <div className="section_title mb-20px">
                  <h4 className="text-info">About Us</h4>
                  <h3>
                  Joy of travel for all At Holiday Inn Hotel & Resort <br />
                  </h3>
                </div>
                <p>
                  we pride ourselves in delivering warm and welcoming experiences
                  for guests staying for business or pleasure. Whether it's time
                  with friends, family, colleagues or clients we have a breadth
                  of hotels from urban centres to beach resorts offering
                  environments, services and amenities that make it easy to
                  work, rest and connect..
                </p>
              </div>
            </div>
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

            {/* <div>
            <div style={{marginRight:"100px"}}>
                  <img src="images/rooms/About us.jpg" alt="" />
                </div>
            </div> */}
          </div>
        </div>
      </div>

      <br />
      <hr />
      <StaffData />
      <hr />
      <Feedback />

      <Footer />
    </div>
  );
};

export default About;
