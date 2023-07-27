import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../../redux/authSlice";
import UserModal from "../Modals/UserModal";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";
import { toast } from "react-toastify";

const User = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [deleteReason,setDeleteReason]=useState('');

  const userState = useSelector((state) => state.user);

  useEffect(() => {
    if (userState.getUsersStatus === "success") {
      setData(userState.allUser);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [userState]);

  useEffect(() => {
    dispatch(getAllUsers());
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
    if(!deleteReason){
      return toast('Please provide reason for deleting user');
    } 
    dispatch(deleteUser({id,deleteReason}));
    setId("");
    setOpen(false);
  };
  return (
    <div>
      <UserModal
        open={open}
        handleClose={handleClose}
        deleteHandler={deleteHandler}
        handleClickOpen={handleClickOpen}
        deleteReason={deleteReason}
        setDeleteReason={setDeleteReason}
      />

      <br />

      <h3 className="mb-5">USER MANAGEMENT</h3>

      {userState.isLoading && <LoadingSpinner />}

      {!userState.allUser.length && !userState.isLoading && (
        <h3 className="text-danger">No Data found</h3>
      )}
      {!userState.isLoading && userState.allUser.length !== 0 && (
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
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Phone Number</th>
                <th scope="col">City</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Is verified</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, i) => {
                if (data.is_admin === false) {
                  return (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.phone}</td>
                      <td>{data.city}</td>
                      <td>{data.address}</td>
                      <td>{data.email}</td>
                      <td>{data.is_verified ? "true" : "false"}</td>
                      <td>
                        <i
                          className="bi bi-trash-fill"
                          onClick={() => handleClickOpen(data._id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
