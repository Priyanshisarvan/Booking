import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { signInUser } from "../../../redux/authSlice";

const Login = (prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    if (role === "User") {
      navigate("/logSign");
    }
    if (role === "Admin") {
      navigate("/admin/home");
    }
  }, [token, role]);

  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!inputVal.email || !inputVal.password) {
      return toast("All Fields are required");
    }
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(inputVal.email)
    ) {
      toast.error("Invalid email");
      return;
    }
    const data = await dispatch(signInUser(inputVal));
    if (data.meta.requestStatus === "fulfilled") {
      console.log("data", data.payload.data.is_admin);
      if (data.payload.data.is_admin) {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div className="formWrapper">
      <div className="form" background="green">
        <h2>Login</h2>
        <form id="form">
          <div className="inputWrapper inputWrapper2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={inputVal.email}
              onChange={setVal}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="inputWrapper inputWrapper2">
            <input
              type="password"
              name="password"
              id="password"
              value={inputVal.password}
              onChange={setVal}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
          </div>
        </form>
        <div className="inputWrapper">
          <input
            form="form-control"
            type="submit"
            name="login"
            className="register"
            value="LOGIN"
            onClick={loginHandler}
          />
        </div>
        <Link style={{ color: "#bf963a", fontSize: 20 }} to="/forgotPassword">
          Forgot password?
        </Link>
        <span id="login">
          Don't have an Account?
          <a
            title="Login"
            style={{ cursor: "pointer", marginLeft: "0%" }}
            onClick={prop.toggle}
          >
            SIGN UP
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
