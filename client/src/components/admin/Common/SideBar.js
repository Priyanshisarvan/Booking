import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../../styles/admin-css/sideBar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import img from "../../../images/photo.jpg";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [subMenu, setSubMenu] = useState(true);
  const name = sessionStorage.getItem("name");

  const btnfunc = () => {
    setShowNav(!showNav);
  };

  const logoutHandler = () => {
    dispatch(logout());
    toast("Logged Out Successfully");
    navigate("/logSign", { replace: true });
  };

  const arrowClick = () => {
    setSubMenu(!subMenu);
  };

  return (
    <div>
      <div className={`sidebar ${showNav && "close"}`}>
        <div className="logo-details">
          <i className="bi bi-x-diamond-fill"></i>
          <span className="logo_name">HOLIDAY INN</span>
        </div>
        <hr className="w-50 px-4 m-auto" />
        <ul className="nav-links">
          <li>
            <Link to="/admin/home">
              <i className="bi bi-house-fill "></i>
              <span className="link_name">Home</span>
            </Link>
          </li>
          <li>
            <div className="icon-link">
              <Link to="/admin/user">
                <i className="bi bi-person-fill"></i>
                <span className="link_name">User Management</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="icon-link">
              <Link to="/admin/room">
                <i className="bi bi-diamond-fill"></i>
                <span className="link_name">Room Management</span>
              </Link>
              <i
                className="bi bi-caret-down-fill arrow"
                height={30}
                onClick={arrowClick}
              ></i>
            </div>
            <ul className={`${subMenu && "sub-menu"}`}>
              <li>
                <Link
                  to="/admin/roomCategory"
                  style={{ color: "black", marginLeft: 40 }}
                >
                  Room Category
                </Link>
              </li>
            </ul>

            <div className="icon-link">
              <Link to="/admin/staff">
                <i className="bi bi-person-fill"></i>
                <span className="link_name">Staff Management</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <Link to="/admin/booking">
              <i className="bi bi-box-fill"></i>
              <span className="link_name">Booking Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/allBooking">
              <i className="bi bi-layers-fill"></i>
              <span className="link_name">All Bookings</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/userContact">
              <i className="bi bi-person-lines-fill"></i>
              <span className="link_name">User Enquiry</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/feedback">
              <i className="bi bi-chat-square-fill"></i>
              <span className="link_name">FeedBack Management</span>
            </Link>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src={img} alt="" />
              </div>
              <div className="name-job">
                <div className="profile_name">{name}</div>
              </div>
              <i className="bi bi-box-arrow-left" onClick={logoutHandler}></i>
            </div>
          </li>
        </ul>
      </div>
      <section className="home-section ">
        <div className="home-content">
          <i className="bi bi-list me-5" onClick={btnfunc}></i>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default SideBar;
