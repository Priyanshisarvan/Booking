import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomReserveStatus } from "../../../redux/bookingSlice";
import { getStaffCount } from "../../../redux/staffSlice";
import { getUserCount } from "../../../redux/authSlice";
import {
  getAvailableRoomCount,
  getRoomsCount,
} from "../../../redux/adRoomSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { reserveStatus } = useSelector((state) => state.booking);
  const { staffCount } = useSelector((state) => state.staff);
  const { userCount } = useSelector((state) => state.user);
  const { roomCount, availableRoomCount } = useSelector(
    (state) => state.addRoom
  );
  console.log("count", userCount);

  useEffect(() => {
    dispatch(getRoomReserveStatus());
    dispatch(getStaffCount());
    dispatch(getUserCount());
    dispatch(getRoomsCount());
    dispatch(getAvailableRoomCount());
  }, [dispatch]);
  console.log("render");

  return (
    <>
      <h2 class="moveable-title">WELCOME TO ADMIN DASHBOARD</h2>
      <div className="container p-5 m-auto">
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card  card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(100, 70, 100, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p className="" style={{ fontSize: 20, fontWeight: "bold" }}>
                    <Link
                      to="/admin/booking"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      All Bookings
                    </Link>
                  </p>
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />
                <h2 className="mb-5">
                  {console.log(reserveStatus)}
                  {reserveStatus?.length === 0
                    ? 0
                    : reserveStatus[0]?.AllBookings}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(30, 20, 20, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-success"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/booking/Approved"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Approved Bookings
                    </Link>
                  </p>
                  <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {reserveStatus?.length === 0 ? 0 : reserveStatus[0]?.Approved}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(100, 70, 100, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-warning"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/booking/Pending"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Pending Bookings
                    </Link>
                  </p>
                  <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {reserveStatus?.length === 0 ? 0 : reserveStatus[0]?.Pending}
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(30, 20, 20, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-primary"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/room"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Total Rooms
                    </Link>
                  </p>
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {roomCount?.length === 0 ? 0 : roomCount?.totalRooms}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(100, 70, 100, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-primary"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/availableRoom"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Available Rooms
                    </Link>
                  </p>
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {availableRoomCount.length === 0 ? 0 : availableRoomCount}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(30, 20, 20, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-primary"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/staff"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Total Staff
                    </Link>
                  </p>
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {staffCount?.length === 0 ? 0 : staffCount}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin mt-4">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div
                className="card-body card1"
                style={{ background: `rgba(100, 70, 100, 0.5)` }}
              >
                <h4 className="font-weight-normal mb-3">
                  <p
                    className="text-primary"
                    style={{ fontSize: 20, fontWeight: "bold" }}
                  >
                    <Link
                      to="/admin/user"
                      style={{
                        textDecoration: "none",
                        color: "rgb(33, 32, 32)",
                      }}
                    >
                      Registered Users
                    </Link>
                  </p>
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <hr style={{ color: "black" }} />

                <h2 className="mb-5">
                  {!userCount?.length ? 0 : userCount[0]?.totalUser}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
