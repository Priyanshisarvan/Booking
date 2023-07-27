import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../../redux/authSlice";



const SignUp = (prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const signUpHandler = async (e) => {
    e.preventDefault();

    if (
      !inputVal.firstName ||
      !inputVal.lastName ||
      !inputVal.phone ||
      !inputVal.city ||
      !inputVal.address ||
      !inputVal.email ||
      !inputVal.password ||
      !inputVal.confirmPassword
    ) {
      return toast("All fields are required");
    }
    if (!/^[A-Za-z]+$/.test(inputVal.firstName)) {
      return toast("Firstname should contain characters");
    }
    if (!/^[A-Za-z]+$/.test(inputVal.lastName)) {
      return toast("Lastname should contain characters");
    }
    if (!/^[0-9]+$/.test(inputVal.phone)) {
      return toast("Phone Number must contain numbers only");
    }
    if (inputVal.phone.length < 10 || inputVal.phone.length > 10) {
      return toast("Phone Number length must be 10 exact only...");
    }
    if (!/^[A-Za-z]+$/.test(inputVal.city)) {
      return toast("City name should contain characters");
    }
    if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(inputVal.email)
    ) {
      return toast("Invalid email");
    }
    if (inputVal.password.length < 8 || inputVal.password.length > 20) {
      return toast("Password length must be 8 to 20");
    }
    if (
      !/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,20}$/.test(
        inputVal.password
      )
    ) {
      return toast(
        "Password should contain atleast one capital character, one number, one special character"
      );
    }
    if (inputVal.password !== inputVal.confirmPassword) {
      return toast("Password and confirm password must be same");
    }
    const data = await dispatch(signUpUser(inputVal));
    if (data.meta.requestStatus === "fulfilled") {
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <div className="formWrapper">
        <div className="form">
          <h2>SIGN UP</h2>
          <form id="form">
            <div className="inputWrapper">
              <input
                type="text"
                id="first"
                autoComplete="off"
                value={inputVal.firstName}
                onChange={setVal}
                name="firstName"
                required
              />
              <label htmlFor="first">First Name</label>
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                id="last"
                autoComplete="off"
                value={inputVal.lastName}
                onChange={setVal}
                name="lastName"
                required
              />
              <label htmlFor="last">Last Name</label>
            </div>
            <div className="inputWrapper">
              <input
                type="textarea"
                id="address"
                autoComplete="off"
                value={inputVal.address}
                onChange={setVal}
                name="address"
                required
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="inputWrapper">
              <input
                type="text"
                id="city"
                autoComplete="off"
                value={inputVal.city}
                onChange={setVal}
                name="city"
                required
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="inputWrapper">
              <input
                type="tel"
                id="phone"
                autoComplete="off"
                value={inputVal.phone}
                onChange={setVal}
                name="phone"
                required
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="inputWrapper">
              <input
                type="email"
                id="email"
                autoComplete="off"
                value={inputVal.email}
                onChange={setVal}
                name="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="inputWrapper">
              <input
                type="password"
                id="password"
                value={inputVal.password}
                onChange={setVal}
                name="password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="inputWrapper">
              <input
                type="password"
                // type={showPassword?'text':'password'}
                id="c_password"
                value={inputVal.confirmPassword}
                onChange={setVal}
                name="confirmPassword"
                required
              />
              <label htmlFor="c_password">Confirm Password</label>
            </div>
          </form>
          <input
            type="submit"
            name="register"
            className="register"
            value="REGISTER"
            onClick={signUpHandler}
          />
          <span id="login">
          <a style={{ marginLeft:"-5%", color: "rgba(247, 241, 241, 0.6)"}}>
            Already have an account?
            </a>
            <a
              title="Login"
              onClick={prop.toggle}
              style={{ cursor: "pointer", marginLeft:"2%"}}
            >
              LOG IN
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
