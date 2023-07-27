import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../redux/authSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.info("Please enter email");
    }
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email)
    ) {
      return toast("Invalid email");
    }
    dispatch(forgotPassword({ email }));
  };

  return (
    <>
      <div className="forgotContainer mx-auto">
        <div className="row">
          <div className="col-md-12 ">
            <form onSubmit={submitHandler}>
              <h2 className="mt-3">Forgot Password</h2>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <button type="submit" className="btn btn-secondary mb-3">
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
