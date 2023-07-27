import React from "react";

const Slider = () => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        data-pause="false"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
         <li data-target="#carouselExampleIndicators" data-slide-to="1"></li> 
          {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>  */}
        </ol>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="banner"
              style={{
                backgroundImage:
                  'url("images/rooms/felipepelaquim-1qvUsVrKrMI-unsplash.jpg")',
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block">
              <h3 className="" style={{ fontFamily: "cursive", color:'Black'}}>
              HOLIDAY INN
              </h3>
              <h4 style={{ fontFamily: "serif", color: "#003300" }}>
               Welcome To The Holiday Inn
              </h4>
            </div>
          </div>
          <div className="carousel-item ">
            <div
              className="banner"
              style={{
                backgroundImage:
                  'url("images/rooms/reisetopia-pSDe7ePo0Tc-unsplash.jpg")'
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block">
              <h3 className="" style={{ fontFamily: "cursive" }}>
              HOLIDAY INN
              </h3>
              <h4 className="" style={{ fontFamily: "serif", color: "#669999" }}>
              Best Place To Live
              </h4>
            </div>
          </div>
          {/* <div className="carousel-item ">
            <div
              className="banner"
              style={{
                backgroundImage:
                  'url("images/rooms/reisetopia-pSDe7ePo0Tc-unsplash.jpg")',
              }}
            ></div>
            <div className="carousel-caption d-none d-md-block">
              <h3 className="" style={{ fontFamily: "cursive" }}>
                HOLIDAY INN
              </h3>
              <h4 className="" style={{ fontFamily: "serif", color: "#003300" }}>
                Unlock to enjoy the view of hotel
              </h4>
            </div>
          </div> */}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default Slider;
