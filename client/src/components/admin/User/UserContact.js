import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserContact,
  getAllUserContact,
  userContactStatusUpdate,
} from "../../../redux/userContactSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../UI/Common/LoadingSpinner";
import Modal from "../Modals/Modal";
import { toast } from "react-toastify";
import $ from "jquery";
import "datatables.net-bs4";
import "datatables.net-select-bs4";

const UserContact = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userContact);

  useEffect(() => {
    if (userState.getAllUserContactStatus === "success") {
      setData(userState.userContact);
      $(document).ready(function () {
        $("#dtBasicExample").DataTable();
        $(".dataTables_length").addClass("bs-select");
      });
    }
  }, [userState]);

  useEffect(() => {
    dispatch(getAllUserContact());
  }, [dispatch]);

  const handleViewOpen = (id) => {
    dispatch(userContactStatusUpdate(id));
    navigate(`/admin/viewUserContact/${id}`, { replace: true });
  };
  const deleteHandler = () => {
    dispatch(deleteUserContact(show));
    setShow("");
    toast("Record Deleted Succesfully..");
    dispatch(getAllUserContact());
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
      <h3 className="mb-5">USER CONTACTS</h3>

      {userState.isLoading && <LoadingSpinner /> }

      {!userState.userContact.length && !userState.isLoading  && (
        <h3 className="mt-4 text-danger">No Data found</h3>

      )}
      {!userState.isLoading && userState.userContact.length!==0 && (
        <div>
        <table
          id="dtBasicExample"
          className="table m-auto mb-5 table-hover"
          style={{ width: 1100 }}
        >
          <thead className=" table table-active">
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {console.log(data)}
            {data.map((data, i) => {
            
              return (
                <tr key={data._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    {data.status === "Read" ? (
                      <p style={{ color: "green", fontWeight: "bold" }}>Read</p>
                    ) : (
                      <p style={{ color: "red", fontWeight: "bold" }}>UnRead</p>
                    )}
                  </td>

                  <td>
                    <i
                      className="bi bi-eye-fill"
                      onClick={() => handleViewOpen(data._id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                    {data.status === "Read" && (
                      <i
                        className="bi bi-trash-fill p-3"
                        onClick={() => handleClickOpen(data._id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    )}
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

export default UserContact;
