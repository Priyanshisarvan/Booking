import React, { useEffect } from "react";
import Header from "../../UI/Common/Header";
import Footer from "../../UI/Common/Footer";
import { HelperFunction } from "../../Helper/Helper";
import { Link } from "react-router-dom";

const Gallery = () => {
  useEffect(() => {
    HelperFunction();
  }, []);

  return (
    <>
      <Header />
      <div className="bradcam_area breadcam_bg_2 mb-5">
     
        <p style={{ fontSize: 30 }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            
            Home
          </Link>
          <Link
            to="/gallery"
            style={{ textDecoration: "none", color: "white" }}
          >
           
            / Gallery
          </Link>
        </p>
      </div>

      <div className="section-top-border mb-5">
        <h3>Our Rooms Images</h3>
        <div className="row gallery-item m-auto">
          <div className="col-md-4">
            <a href="/" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  backgroundImage: `url('../images/rooms/Room1.jpg')`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="/" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url('../images/rooms/Room4.jpg')`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="/" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url('../images/rooms/Single Room 2.jpg')`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-6">
            <a href="/"  className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url('../images/rooms/room3.jpg')`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-6">
            <a href="img/elements/g5.jpg" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url(../images/rooms/Room7.jpg)`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="img/elements/g6.jpg" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{ 
                  background: `url(../images/rooms/Room6.jpg)`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="img/elements/g7.jpg" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url(../images/rooms/boxed-water-is-better-yaAGwbkbc-s-unsplash.jpg)`,
                }}
              ></div>
            </a>
          </div>
          <div className="col-md-4">
            <a href="img/elements/g8.jpg" className="img-pop-up">
              <div
                className="single-gallery-image"
                style={{
                  background: `url(../images/rooms/Room5.jpg)`,
                }}
              ></div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
