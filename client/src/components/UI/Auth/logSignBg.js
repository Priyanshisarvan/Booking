import React, { useState } from "react";
import "../../../styles/admin-css/signup.css";
import SignUp from "../Auth/SignUp";
import logo from "../../../images/crown.svg";
import Login from "./Login";

const LogSignBg = () => {
  const [isShow, setIsShow] = useState(false);
  const toggle = () => {
    setIsShow(!isShow);
  };
  return (
    <div className="signup">
      <main className="container-signup ">
        <div className="back"></div>
        <div className="brand">
          <div className="logo">
            <img height="64" src={logo} alt="Panda Logo" />
            <h1>
              <span className="name m-2 pt-4">Holiday Inn</span>
            </h1>
          </div>
        </div>
        {isShow ? <SignUp toggle={toggle} /> : <Login toggle={toggle} />}
      </main>
    </div>
  );
};

export default LogSignBg;
