import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../../../redux/staffSlice";

const StaffData = () => {
  const dispatch = useDispatch();
  const staffState = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  return (
    <>
      <h2 className="mb-5 mt-5" style={{ fontFamily: "cursive" }}>
        OUR STAFF
      </h2>
      <div className="staff-data">
        <div
          id="carouselExampleControls_1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="staff-data">
            <div className="carousel-inner">
              {staffState.staff &&
                staffState.staff.map((data, i) => {
                  return (
                    <div
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                      key={data._id}
                    >
                      <img
                        src={data.url}
                        height={340}
                        width={300}
                        alt={data.name}
                      />
                      <h3 style={{ fontWeight: "bold" }} className="mt-4">
                        {data.name}
                      </h3>
                      <h5
                        style={{ fontWeight: "bold", color: "darkslategrey" }}
                      >
                        {data.jobRole}
                      </h5>
                    </div>
                  );
                })}
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls_1"
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
            href="#carouselExampleControls_1"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{color:"black"}}
            ></span>
            <span className="sr-only" >Next</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default StaffData;
