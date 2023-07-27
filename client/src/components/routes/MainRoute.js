import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../UI/Common/Header";
import HomePage from "../UI/Pages/HomePage";
import Booking from "../UI/Bookings/Booking";
import ForgotPassword from "../UI/Auth/ForgotPassword";
import ResetPassword from "../UI/Auth/ResetPassword";
import NotFound from "../UI/Pages/NotFound";
import Rooms from "../UI/Rooms/Rooms";
import SearchRooms from "../UI/Rooms/SearchRooms";
import About from "../UI/Pages/About";
import BookNow from "../UI/Bookings/BookNow";
import ParticularRoomCategory from "../UI/Rooms/ParticularRoom";
import ViewBookingDetails from "../UI/Bookings/ViewBookingDetails";
import UserProfile from "../UI/Auth/UserProfile";
import Gallery from "../UI/Pages/Gallery";
import LogSignBg from "../UI/Auth/logSignBg";
import Contact from "../UI/Pages/Contact";
import SideBar from "../admin/Common/SideBar";
import Home from "../admin/Common/Home";
import AddStaff from "../admin/Staff/AddStaff";
import Room from "../admin/Room/Room";
import AdminBooking from "../admin/Booking/Booking";
import Staff from "../admin/Staff/Staff";
import User from "../admin/User/User";
import AddRoom from "../admin/Room/AddRoom";
import RoomCategory from "../admin/Room/RoomCategory";
import AddRoomCategory from "../admin/Room/AddRoomCategory";
import AdminViewBookingDetails from "../admin/Booking/AdminViewBookingDetails";
import UserContact from "../admin/User/UserContact";
import ViewUserContact from "../admin/User/ViewUserContact";
import EditRoomCategory from "../admin/Room/EditRoomCategory";
import EditRoom from "../admin/Room/EditRoom";
import EditStaff from "../admin/Staff/EditStaff";
import AvailableRoom from "../admin/Room/AvailableRooms";
import AllBookingsPage from "../admin/Booking/AllBookingsPage";
import Feedback from "../admin/Common/Feedback";
import ViewFeedback from "../admin/Common/ViewFeedback";




const MainRoute = () => {
  const [role, setRole] = useState("");
  console.log("--------", sessionStorage.getItem("role"));

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/logSign" element={<LogSignBg />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />}></Route>

        {/* User Routes */}

        <Route path="/header" element={<Header />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:roomCategoryId" element={<Rooms />} />
        <Route
          path="/particularRoomCategory/:id"
          element={<ParticularRoomCategory />}
        />
        <Route
          path="/searchRooms/:noOfAdults/:noOfChildren/:roomCategoryId"
          element={<SearchRooms />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/bookNow/:id" element={<BookNow />} />
        <Route path="/viewBooking/:id" element={<ViewBookingDetails />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
 


        {/* Admin Routes */}

        {role === "Admin" && (
          <Route path="/admin" element={<SideBar />}>
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/addStaff" element={<AddStaff />} />
            <Route path="/admin/editStaff/:id" element={<EditStaff />} />
            <Route path="/admin/staff" element={<Staff />} />
            <Route path="/admin/room" element={<Room />} />
            <Route path="/admin/addRoom" element={<AddRoom />} />
            <Route path="/admin/editRoom/:id" element={<EditRoom />} />
            <Route path="/admin/availableRoom" element={<AvailableRoom />} />
            <Route path="/admin/roomCategory" element={<RoomCategory />} />
            <Route
              path="/admin/addRoomCategory"
              element={<AddRoomCategory />}
            />
            <Route
              path="/admin/editRoomCategory/:id"
              element={<EditRoomCategory />}
            />
            <Route path="/admin/booking" element={<AdminBooking />} />
            <Route path="/admin/booking/:status" element={<AdminBooking />} />
            <Route path="/admin/allBooking" element={<AllBookingsPage />} />
            <Route path="/admin/userContact" element={<UserContact />} />
            <Route
              path="/admin/viewUserContact/:id"
              element={<ViewUserContact />}
            />
            <Route
              path="/admin/adminViewBooking/:id"
              element={<AdminViewBookingDetails />}
            />
            <Route path="/admin/feedback" element={<Feedback />} />
            <Route path="/admin/viewFeedback/:id" element={<ViewFeedback />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MainRoute;
