import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeedback, getAllFeedback } from "../../../redux/feedbackSlice";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import Modal from "../Modals/Modal";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const feedbackState = useSelector((state) => state.feedback);

  useEffect(() => {
    if (feedbackState.getAllFeedbackStatus === "success") {
      setData(feedbackState.feedback);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [feedbackState]);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setId(" ");
  };
  const deleteHandler = () => {
    dispatch(deleteFeedback(id));
    setId("");
    setOpen(false);
  };
  const handleViewOpen = (id) => {
    navigate(`/admin/viewFeedback/${id}`, { replace: true });
  };
  
  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />
      <h3 className="mb-5">FEEDBACK MANAGEMENT</h3>

      {feedbackState.isLoading && <LoadingSpinner />}

      {!feedbackState.feedback.length && !feedbackState.isLoading && (
        <h3 className="text-danger">No Data found</h3>
      )}
      {!feedbackState.isLoading && feedbackState.feedback.length !== 0 && (
        <div>
          <table
            align="center"
            className="table m-auto mb-4 table-hover"
            id="dtBasicExample"
            style={{ width: 1100 }}
          >
            <thead>
              <tr className="table table-active">
                <th scope="col">Sr No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Comments</th>
                <th scope="col">Ratings</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.userId?.firstName}</td>
                    <td>{data.userId?.email}</td>
                    <td>{data.userId?.phone}</td>
                    <td>{data.comments}</td>
                    <td>
                      {Array.from(Array(Number(data.ratings)),(e, i) => {
                        return (
                          <i
                            key={i}
                            className="bi bi-star-fill p-1 text-warning"
                          ></i>
                        );
                      })}
                    </td>
                    <td>
                      <i
                        className="bi bi-eye-fill m-2"
                        onClick={() => handleViewOpen(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => handleClickOpen(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
        </div>
      )}
    </div>
  );
};

export default Feedback;

