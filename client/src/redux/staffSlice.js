import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import StaffApi from "../Api/StaffApi.js";

const token = sessionStorage.getItem("token");

const initialState = {
  isLoading: false,
  staff: [],
  staffCount: [],
  staffById: [],

  error: "",
  addStaffStatus: "",
  addStaffError: "",

  getStaffStatus: "",
  getStaffError: "",

  getStaffCountError: "",
  getStaffCountStatus: "",
  
  deleteStaffStatus: "",
  deleteStaffError: "",
};

export const getAllStaff = createAsyncThunk(
  "staff/getAllStaff",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await StaffApi.get("getAllStaff");
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

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const headers = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await StaffApi.post("addStaff", formData, headers);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const headers = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await StaffApi.delete("deleteStaff/" + _id, headers);
      dispatch(getAllStaff());
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

export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const headers = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await StaffApi.patch(
        "updateStaff/" + data.get("id"),
        data,
        headers
      );
      toast(response.data.message)
      dispatch(getAllStaff());
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

export const getStaffCount = createAsyncThunk(
  "staff/getStaffCount",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await StaffApi.get("getStaffCount", config);
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

export const getStaffById = createAsyncThunk(
  "addRoom/getRoomsById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await StaffApi.get("getStaffById/" + id, config);
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

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    editStaff: (state, action) => {
      state.editStaff = action.payload;
    },
  },
  extraReducers: (builder) => {

    builder
    
    // Add staff

      .addCase(addStaff.pending, (state) => {
        return {
          ...state,
          addStaffStatus: "pending",
          addStaffError: "",
        };
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        return {
          ...state,
          addStaffStatus: "fulfilled",
          addStaffError: "",
        };
      })
      .addCase(addStaff.rejected, (state, action) => {
        return {
          ...state,
          addStaffStatus: "rejected",
          addStaffError: action.payload,
        };
      })

      // Get All Staff

      .addCase(getAllStaff.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getStaffStatus: "pending",
          getStaffError: "",
        };
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          staff: action.payload,
          getStaffStatus: "success",
          getStaffError: "",
        };
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getStaffStatus: "rejected",
          getStaffError: action.payload,
        };
      })

      // Get Staff By Id 

      .addCase(getStaffById.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getStaffStatus: "pending",
          getStaffError: "",
        };
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          staffById: action.payload,
          getStaffStatus: "success",
          getStaffError: "",
        };
      })
      .addCase(getStaffById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getStaffStatus: "rejected",
          getStaffError: action.payload,
        };
      })

      // Delete Staff

      .addCase(deleteStaff.pending, (state) => {
        return {
          ...state,
          deleteStaffStatus: "pending",
          deleteStaffError: "",
        };
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        const currentStaff = state.staff.filter(
          (staff) => staff._id !== action.payload._id
        );

        return {
          ...state,
          staff: currentStaff,
          deleteStaffStatus: "success",
          deleteStaffError: "",
        };
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        return {
          ...state,
          deleteStaffStatus: "rejected",
          deleteStaffError: action.payload,
        };
      })

      // Get total number of Staff

      .addCase(getStaffCount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getStaffCountStatus: "pending",
          getStaffCountError: "",
        };
      })
      .addCase(getStaffCount.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          staffCount: action.payload,
          getStaffCountStatus: "success",
          getStaffCountError: "",
        };
      })
      .addCase(getStaffCount.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getStaffCountStatus: "rejected",
          getStaffCountError: action.payload,
        };
      });
  },
});

export const { editStaff } = staffSlice.actions;
export default staffSlice.reducer;
