import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import RoomApi from "../Api/RoomApi.js";

const token = sessionStorage.getItem("token");

const initialState = {
  isLoading: false,

  room: [],
  room1: [],
  roomById: [],
  roomCount: [],
  allRoom: [],
  roomData:[],
  getAvailableRooms: [],
  availableRoomCount: [],
  getSearchedRooms:[],

  error: "",
  addRoomStatus: "",
  addRoomError: "",

  getRoomStatus: "",
  getRoomError: "",
  
  getRoomCountStatus: "",
  getRoomCountError: "",

  getRoomByIdStatus: "",
  getRoomByIdError: "",

  getRoomByCategoryStatus: "",
  getRoomByCategoryError: "",

  deleteRoomStatus: "",
  deleteRoomError: "",

  getAllRoomAdminStatus: "",
  getAllRoomAdminError: "",

  getAvailableRoomsStatus: "",
  getAvailableRoomsError: "",

  getSearchRoomStatus: "",
  getSearchRoomError: "",
};

export const addRoom = createAsyncThunk(
  "addRoom/addRoom",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await RoomApi.post("addRoom", formData, config);
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

export const getAllRooms = createAsyncThunk(
  "addRoom/getAllRooms",
  async (id = null, { rejectWithValue }) => {
    try {     
      const response = await RoomApi.get("getRoom");
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

export const getAllRoomsAdmin = createAsyncThunk(
  "addRoom/getAllRoomsAdmin",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomApi.get("getAllRoomsAdmin", config);
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

export const deleteRoom = createAsyncThunk(
  "addRoom/deleteRoom",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomApi.delete("deleteRoom/" + _id, config);
      toast(response.data.message);
      dispatch(getAllRoomsAdmin());
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

export const updateRoom = createAsyncThunk(
  "addRoom/updateRoom",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await RoomApi.patch(
        "updateRoom/" + data.get("id"),
        data,
        config
      );
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

export const getRoomsByCategoryId = createAsyncThunk(
  "addRoom/getRoomsByCategoryId",
  async (id, { rejectWithValue }) => {
    try {
      const query = id !== "All" ? `roomCategoryId=${id}` : "";
      const response = await RoomApi.get(
        "getRoomByItsCategoryId?" + (query && query)
      );
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

export const getRoomsById = createAsyncThunk(
  "addRoom/getRoomsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await RoomApi.get("getRoomDetailById/" + id);
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

export const getRoomsCount = createAsyncThunk(
  "addRoom/getRoomsCount",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomApi.get("getRoomCount", config);
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

export const getAvailableRooms = createAsyncThunk(
  "addRoom/getAvailableRooms",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomApi.get("getAvailableRooms", config);
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

export const getAvailableRoomCount = createAsyncThunk(
  "addRoom/getAvailableRoomCount",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomApi.get("getAvailableRoomCount", config);
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

export const getSearchedRooms= createAsyncThunk(
  "addRoom/getSearchedRooms",
  async (data, { rejectWithValue }) => {
    try {
      const response = await RoomApi.get("getSearchedRooms/" + data.noOfAdults+"/"+data.noOfChildren+"/"+data.roomCategoryId);
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

const roomSlice = createSlice({
  name: "addRoom",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

      //Add Room
      .addCase(addRoom.pending, (state) => {
        return {
          ...state,
          addRoomStatus: "pending",
          addRoomError: "",
        };
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        return {
          ...state,
          addRoomStatus: "fulfilled",
          addRoomError: "",
        };
      })
      .addCase(addRoom.rejected, (state, action) => {
        return {
          ...state,
          addRoomStatus: "rejected",
          addRoomError: action.payload,
        };
      })

      //get All Rooms

      .addCase(getAllRooms.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getRoomStatus: "pending",
          getRoomError: "",
        };
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          allRoom: action.payload,
          getRoomStatus: "success",
          getRoomError: "",
        };
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getRoomStatus: "rejected",
          getRoomError: action.payload,
        };
      })

      //get rooms Count

      .addCase(getRoomsCount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getRoomCountStatus: "pending",
          getRoomCountError: "",
        };
      })
      .addCase(getRoomsCount.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          roomCount: action.payload,
          getRoomCountStatus: "success",
          getRoomCountError: "",
        };
      })
      .addCase(getRoomsCount.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getRoomCountStatus: "rejected",
          getRoomCountError: action.payload,
        };
      })

      //get rooms Count

      .addCase(getAvailableRoomCount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getAvailableRoomCountStatus: "pending",
          getAvailableRoomCountError: "",
        };
      })
      .addCase(getAvailableRoomCount.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          availableRoomCount: action.payload,
          getAvailableRoomCountStatus: "success",
          getAvailableRoomCountError: "",
        };
      })
      .addCase(getAvailableRoomCount.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAvailableRoomCountStatus: "rejected",
          getAvailableRoomCountError: action.payload,
        };
      })

      //get all available rooms

      .addCase(getAvailableRooms.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getAvailableRoomsStatus: "pending",
          getAvailableRoomsError: "",
        };
      })
      .addCase(getAvailableRooms.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAvailableRooms: action.payload,
          getAvailableRoomsStatus: "success",
          getAvailableRoomsError: "",
        };
      })
      .addCase(getAvailableRooms.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAvailableRoomsStatus: "rejected",
          getAvailableRoomsError: action.payload,
        };
      })

      //get All Rooms by its Category

      .addCase(getRoomsByCategoryId.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getRoomByCategoryStatus: "pending",
          getRoomByCategoryError: "",
        };
      })
      .addCase(getRoomsByCategoryId.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          room1: action.payload,
          getRoomByCategoryStatus: "success",
          getRoomByCategoryError: "",
        };
      })
      .addCase(getRoomsByCategoryId.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getRoomByCategoryStatus: "rejected",
          getRoomByCategoryError: action.payload,
        };
      })

       //get All Rooms by its number of adults, children and roomCategory 

      .addCase(getSearchedRooms.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getSearchRoomStatus: "pending",
          getSearchRoomError: "",
        };
      })
      .addCase(getSearchedRooms.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getSearchedRooms: action.payload,
          getSearchRoomStatus: "success",
          getSearchRoomError: "",
        };
      })
      .addCase(getSearchedRooms.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getSearchRoomStatus: "rejected",
          getSearchRoomError: action.payload,
        };
      })

      //Delete Room

      .addCase(deleteRoom.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          deleteRoomStatus: "pending",
          deleteRoomError: "",
        };
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {

        return {
          ...state,
          isLoading: false,
          deleteRoomStatus: "success",
          deleteRoomError: "",
        };
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          deleteRoomStatus: "rejected",
          deleteRoomError: action.payload,
        };
      })

      //Get Rooms By Id

      .addCase(getRoomsById.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          getRoomByIdStatus: "pending",
          getRoomByIdError: "",
        };
      })
      .addCase(getRoomsById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          roomById: action.payload,
          getRoomByIdStatus: "success",
          getRoomByIdError: "",
        };
      })
      .addCase(getRoomsById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getRoomByIdStatus: "rejected",
          getRoomByIdError: action.payload,
        };
      })

      //get All Rooms at Admin side

      .addCase(getAllRoomsAdmin.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getAllRoomAdminStatus: "pending",
          getAllRoomAdminError: "",
        };
      })
      .addCase(getAllRoomsAdmin.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          allRoom: action.payload,
          getAllRoomAdminStatus: "success",
          getAllRoomAdminError: "",
        };
      })
      .addCase(getAllRoomsAdmin.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAllRoomAdminStatus: "rejected",
          getAllRoomAdminError: action.payload,
        };
      });
  },
});

export const { editRoomData } = roomSlice.actions;

export default roomSlice.reducer;
