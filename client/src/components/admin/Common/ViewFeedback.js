import {
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Table,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackDetailById } from "../../../redux/feedbackSlice";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";

const ViewFeedback = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { feedbackById, isLoading } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getFeedbackDetailById(id));
  }, [dispatch]);
  
  useEffect(() => {
    setData(feedbackById);
  }, [feedbackById]);

  if (!data) {
    return <div></div>;
  }

  if (!data.userId) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3>VIEW USER'S FEEDBACK DETAIL</h3>

          <div className="viewContact mt-5">
            <TableContainer style={{backgroundColor:'ButtonShadow'}}>
              <Table
                sx={{ minWidth: 650, backgroundColor: "transparent" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow key={data._id}>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                        width: "20%",
                      }}
                      align="left"
                    >
                      Name :
                    </TableCell>

                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 15 }}
                    >
                      {data.userId.firstName + " " + data.userId.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Phone Number:
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {data.userId.phone}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Address:
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {data.userId.address}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      City:
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {data.userId.city}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Email ID :
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={4}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {data.userId.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Comments :
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={4}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {data.comments}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Ratings :
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {Array.from(Array(Number(data.ratings)), (e, i) => {
                        return (
                          <i className="bi bi-star-fill p-1 text-warning"></i>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        fontSize: 18,
                      }}
                      align="left"
                    >
                      Feedback Date :
                    </TableCell>
                    <TableCell
                      align="left"
                      colSpan={5}
                      style={{ color: "black", fontSize: 16 }}
                    >
                      {new Date(data.date).toJSON().slice(0, 10)}
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
          <Link
            to="/admin/feedback"
            style={{
              color: "black",
              fontWeight: "bold",
              marginLeft: -1330,
              textDecoration: "none",
            }}
          >
            <i className="bi bi-arrow-left"></i>BACK
          </Link>
        </>
      )}
    </>
  );
};

export default ViewFeedback;
