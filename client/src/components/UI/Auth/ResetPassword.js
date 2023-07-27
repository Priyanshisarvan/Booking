import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../redux/authSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const queryToken = new URLSearchParams(location.search);
  const token = queryToken.get("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast("All fields are required");
    }
    if (password !== confirmPassword) {
      return toast("Password and ConfirmPassword must be same");
    }
    dispatch(resetPassword({ password, token }));
    navigate("/logSign");
  };

  return (
    <>
      <div className="forgotContainer mx-auto ">
        <div className="row">
          <div className="col-md-12 ">
            <form onSubmit={submitHandler}>
              <h2 className="mt-3">Reset Password</h2>

              <div className="form-group ">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control "
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-group ">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  className="form-control "
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <button type="submit" className="btn btn-secondary mb-4">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
