import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteStaff, getAllStaff } from "../../../redux/staffSlice";
import Modal from "../Modals/Modal";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";

const Staff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const [data, setData] = useState([]);    
  const [show, setShow] = useState("");
  const [open, setOpen] = React.useState(false);
   
  const staffState = useSelector((state) => state.staff);

  useEffect(() => {
    if (staffState.getStaffStatus === "success") {
      setData(staffState.staff);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $('.dataTables_length').addClass('bs-select');
      });
    }
  }, [staffState]);
  
  useEffect(() => {
    dispatch(getAllStaff());
  }, [dispatch]);

  const editHandler = (id) => {
    navigate("/admin/editStaff/" + id);
  };
  const deleteHandler = () => {
    dispatch(deleteStaff(show));
    setShow("");
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setShow(id);
  };
  const handleClose = () => {
    setOpen(false);
    setShow(" ");
  };
  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
      />
      
        <h3>STAFF MANAGEMENT</h3>
        <Link to="/admin/AddStaff" style={{ marginLeft: 1000 }}>
          <button className="btn btn-dark m-3 mb-4">Add Staff</button>
        </Link>
       
       {staffState.isLoading && <LoadingSpinner />}

       {!staffState.staff.length && !staffState.isLoading && (
          <h3 className="text-danger">No Data found</h3>

       )}

        {!staffState.isLoading && staffState.staff.length!==0  && (
         <div>
          <table
            style={{ width: 1100 }}
            className="table m-auto mb-5 table-hover"
            id="dtBasicExample"
          >
            <thead className="table table-active">
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Job Role</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>                
              </tr>
            </thead>
            <tbody>
              {data && data.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.phoneNo}</td>
                    <td>{data.email}</td>
                    <td>{data.jobRole}</td>
                    <td>
                      <img
                        src={data.url}
                        height={100}
                        width={100}
                        alt="StaffImage"
                      />
                    </td>
                    <td>
                      <i
                        className="bi bi-pencil"
                        onClick={() => editHandler(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                      &nbsp; &nbsp;
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

export default Staff;
