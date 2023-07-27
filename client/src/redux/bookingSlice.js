import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import BookingApi from "../Api/BookingApi.js";

const token = sessionStorage.getItem("token");

const initialState = {
  isLoading: false,
  booking: [],
  booking1: [],
  dataById: [],
  getbookingStatusData: [],
  reserveStatus: [],
  bookedData: [],

  error: "", 
  addBookingStatus: "",
  addBookingError: "",

  getbookingStatus: "",
  getbookingError: "",

  getbookedDataStatus: "",
  getbookedDataError: "",

  getbookingDetailByStatus: "",
  getbookingDetailByStatusError: "",

  getbookingByIdStatus: "",
  getbookingByIdError: "",

  getReserveStatus: "",
  getReserveError: "",
};

export const roomBooking = createAsyncThunk(
  "booking/roomBooking",
  async (data, { rejectWithValue }) => {
    try {
      const Headers = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await BookingApi.post(
        `/addRoomReserve/${data.id}`,
        data.inputVal,
        Headers
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);





export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await BookingApi.get("getAllReservedRooms");
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getBookingDetailById = createAsyncThunk(
  "booking/getBookingDetailById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await BookingApi.get("getBookingDetailById/" + id);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getBookingDetailByUserId = createAsyncThunk(
  "booking/getBookingDetailByUserId",
  async (id = null, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token")
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await BookingApi.get(
        "/getBookingDetailByUserId",
        config
      );
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        console.log(error);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const bookingStatusUpdate = createAsyncThunk(
  "booking/bookingStatusUpdate",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await BookingApi.patch(
        "updateBookingStatus/" + data + "/Approved"
      );
      dispatch(getAllBookings());
      toast(response.data.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const deleteReserveRooms = createAsyncThunk(
  "booking/deleteReserveRooms",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const response = await BookingApi.delete("deleteReserveRoom/" + _id);
      dispatch(getAllBookings());
      toast(response.data.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getRoomReserveStatus = createAsyncThunk(
  "booking/getRoomReserveStatus",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await BookingApi.get("getRoomReserveStatus");
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getBookingDetailByStatus = createAsyncThunk(
  "booking/getBookingDetailByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const query = status ? `status=${status}` : "";
      const response = await BookingApi.get(
        "getBookingDetailByItsStatus?" + (query && query)
      );
      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const updatecheckInStatus = createAsyncThunk(
  "booking/updatecheckInStatus",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await BookingApi.get("checkInStatus/" + id);
      dispatch(getAllBookings());
      toast(response.data.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const updatecheckOutStatus = createAsyncThunk(
  "booking/updatecheckInStatus",
  async (id = null, { rejectWithValue, dispatch }) => {
    try {
      const response = await BookingApi.get("checkOutStatus/" + id);
      dispatch(getAllBookings());
      toast(response.data.message);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const deleteBookedDetails = createAsyncThunk(
  "booking/deleteBookedDetails",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const response = await BookingApi.delete("deleteBookedRooms/" + _id);
      dispatch(getAllBookingDetails());
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getAllBookingDetails = createAsyncThunk(
  "booking/getAllBookingDeatils",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await BookingApi.get("getBookingDetails",config);
      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);

        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
    // Room booking
      .addCase(roomBooking.pending, (state) => {
        return {
          ...state,
          addBookingStatus: "pending",
          addBookingError: "",
        };
      })
      .addCase(roomBooking.fulfilled, (state, action) => {
        return {
          ...state,
          addBookingStatus: "fulfilled",
          addBookingError: "",
        };
      })
      .addCase(roomBooking.rejected, (state, action) => {
        return {
          ...state,
          addBookingStatus: "rejected",
          addBookingError: action.payload,
        };
      })

      // Get All Bookings

      .addCase(getAllBookings.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getbookingStatus: "pending",
          getbookingError: "",
        };
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          booking: action.payload,
          getbookingStatus: "success",
          getbookingError: "",
        };
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookingStatus: "rejected",
          getbookingError: action.payload,
        };
      })

      // Get Booked Data

      .addCase(getAllBookingDetails.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getbookedDataStatus: "pending",
          getbookedDataError: "",
        };
      })
      .addCase(getAllBookingDetails.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          bookedData: action.payload,
          getbookedDataStatus: "success",
          getbookedDataError: "",
        };
      })
      .addCase(getAllBookingDetails.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookedDataStatus: "rejected",
          getbookedDataError: action.payload,
        };
      })

      //get Booking Status

      .addCase(getRoomReserveStatus.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getReserveStatus: "pending",
          getReserveError: "",
        };
      })
      .addCase(getRoomReserveStatus.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          reserveStatus: action.payload,
          getReserveStatus: "success",
          getReserveError: "",
        };
      })
      .addCase(getRoomReserveStatus.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getReserveStatus: "rejected",
          getReserveError: action.payload,
        };
      })

      //get Booking Detail By its Id

      .addCase(getBookingDetailById.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getbookingByIdStatus: "pending",
          getbookingByIdError: "",
        };
      })
      .addCase(getBookingDetailById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          dataById: action.payload,
          getbookingByIdStatus: "success",
          getbookingByIdError: "",
        };
      })
      .addCase(getBookingDetailById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookingByIdStatus: "rejected",
          getbookingByIdError: action.payload,
        };
      })

      // get Booking Detail By Its Status
       
      .addCase(getBookingDetailByStatus.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getbookingDetailByStatus: "pending",
          getbookingDetailByStatusError: "",
        };
      })
      .addCase(getBookingDetailByStatus.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookingStatusData: action.payload,
          getbookingDetailByStatus: "success",
          getbookingDetailByStatusError: "",
        };
      })
      .addCase(getBookingDetailByStatus.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookingDetailByStatus: "rejected",
          getbookingDetailByStatusError: action.payload,
        };
      })

      //getBookingDetailByUserId

      .addCase(getBookingDetailByUserId.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getbookingByIdStatus: "pending",
          getbookingByIdError: "",
        };
      })
      .addCase(getBookingDetailByUserId.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          booking1: action.payload,
          getbookingByIdStatus: "success",
          getbookingByIdError: "",
        };
      })
      .addCase(getBookingDetailByUserId.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getbookingByIdStatus: "rejected",
          getbookingByIdError: action.payload,
        };
      });
  },
});

export default bookingSlice.reducer;
