import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedback } from "../../../redux/feedbackSlice";

const  Feedback = () => {
  const dispatch = useDispatch();
  const feedBackState = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

  return (
    <div className="mt-5" >
      <h2 style={{ fontFamily: "cursive" }}>What Customer Says? </h2>
      <div className="feedback-data mt-5">
        <div
          id="carouselExampleControls_2"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="feedback-data ">
            <div className="carousel-inner">
              {feedBackState.feedback &&
                feedBackState.feedback.map((data, i) => {
                  return (
                    <div
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                      key={data._id}
                    >
                      <h3 className="mt-5">~ {`${data.userId?.firstName ?? "default"} ${data.userId?.lastName ?? ""}`}</h3>
                      <p>{data.comments}</p>
                      <p>
                        <>
                          {Array.from(Array(Number(data.ratings)), (e, i) => {
                            return (
                              <i className="bi bi-star-fill p-1 text-warning" key={i}></i>
                            );
                          })}
                        </>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls_2"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only" >Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls_2"
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
      </div>
    </div>
  );
};

export default Feedback;
