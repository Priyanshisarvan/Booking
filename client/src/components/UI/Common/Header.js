import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import { toast } from "react-toastify";
import { getAllRoomsCategory } from "../../../redux/roomCategorySlice";
import logo from "../../../images/crown.svg";



const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllRoomsCategory());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    toast("Logged Out Successfully");
    navigate("/", { replace: true });
  };

  const loginHandler = () => {
    navigate("/logSign", { replace: true });
  };

  return (
    <>
      <header>
        <div className="header main-menu-logo bg-none ">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <Link to="/">
                <img src={logo} width={70} alt="logoImage" />
              </Link>
              <span
                className=""
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  marginTop: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                HOLIDAY INN
              </span>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                style={{ marginTop: 7 }}
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link menuNavLink">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/rooms" className="nav-link menuNavLink">
                      Rooms
                    </NavLink>
                  </li>

                  <li className="nav-item ">
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item ">
                    <NavLink to="/gallery" className="nav-link">
                      Gallery
                    </NavLink>
                  </li>


                  {token && (
                    <>
                      <li className="nav-item ">
                        <NavLink to="/booking" className="nav-link">
                          Bookings
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink to="/contact" className="nav-link">
                          Contact
                        </NavLink>
                      </li>

                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-person "></i>
                        </button>
                        <ul className="dropdown-menu ">
                          <li>
                            <Link to="/userProfile" className="dropdown-item">
                              User Profile
                            </Link>
                          </li>
                        <li>
                            <a
                              className="dropdown-item"
                              href={null}
                              onClick={logoutHandler}
                              style={{ cursor: "pointer" }}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}

                  
                  
                </ul>
                {!token && (
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={loginHandler}
                  >
                    LOGIN
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;






