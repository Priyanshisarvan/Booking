import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserContactDetailById } from "../../../redux/userContactSlice";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ViewUserContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { contactDataById } = useSelector((state) => state.userContact);

  useEffect(() => {
    dispatch(getUserContactDetailById(id));
  }, []);

  useEffect(() => {
    setData(contactDataById);
  }, [contactDataById]);


  if (!data) {
    return <div></div>;
  }
  return (
    <>
      <h3>VIEW USER CONTACTS</h3>
      <div className="viewContact mt-5">
        <TableContainer style={{backgroundColor:'ButtonShadow'}}>
          <Table
            sx={{ minWidth: 650, backgroundColor: "transparent" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                  align="left"
                >
                  Customer Name :
                </TableCell>
                <TableCell align="left" colSpan={5}  style={{ color: "black", fontSize: 17 }}>
                  {data?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                  align="left"
                >
                  Phone Number:
                </TableCell>
                <TableCell align="left" colSpan={5}  style={{ color: "black", fontSize: 17 }}>
                  {data?.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                  align="left"
                >
                  Email ID :
                </TableCell>
                <TableCell align="left" colSpan={5}  style={{ color: "black", fontSize: 17 }}>
                  {data?.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", color: "black", fontSize: 18 }}
                  align="left"
                >
                  Message :
                </TableCell>
                <TableCell align="left" colSpan={5}  style={{ color: "black", fontSize: 17 }}>
                  {data?.message}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
      <Link
        to="/admin/userContact"
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
  );
};

export default ViewUserContact;
