import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import RoomCategoryApi from '../Api/RoomCategoryApi.js';

const token = sessionStorage.getItem("token");

const initialState = {
  isLoading: false,
  roomCategory: [],
  roomCategoryById:[],
 
  error: "",
  addRoomCategoryStatus: "",
  addRoomCategoryError: "",

  getRoomCategoryStatus: "",
  getRoomCategoryError: "",

  getRoomCategoryByIdStatus: "",
  getRoomCategoryByIdError: "",

  deleteRoomCategoryStatus: "",
  deleteRoomCategoryError: "",
  
  updateRoomCategoryStatus: "",
  updateRoomCategoryError: "",
};

export const addRoomCategory = createAsyncThunk(
  "addRoom/addRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };      
      const response = await RoomCategoryApi.post("addRoomCategory", roomData,config);
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

export const getAllRoomsCategory = createAsyncThunk(
  "roomCategory/getAllRoomsCategory",
  async (id = null, { rejectWithValue }) => {
    try {
    
      const response = await RoomCategoryApi.get("getAllRoomCategory");
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

export const deleteRoomCategory = createAsyncThunk(
  "roomCategory/deleteRoomCategory",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomCategoryApi.delete("deleteRoomCategory/" + _id,config);
      toast(response.data.message);
      dispatch(getAllRoomsCategory());
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

export const updateRoomCategory = createAsyncThunk(
  "roomCategory/updateRoomCategory",
  async (data, { rejectWithValue,dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await RoomCategoryApi.patch("updateRoomCategory/" +data.id, data,config);
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

export const getRoomsCategoryById = createAsyncThunk(
  "roomCategory/getRoomsCategoryById",
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await RoomCategoryApi.get("getDataById/"+id);
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

const roomCategorySlice = createSlice({
  name: "roomCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //Add Room Category

    builder
    .addCase(addRoomCategory.pending, (state) => {
      return {
        ...state,
        addRoomCategoryStatus: "pending",
        addRoomCategoryError: "",
      };
    })
    .addCase(addRoomCategory.fulfilled, (state, action) => {
      return {
        ...state,
        addRoomCategoryStatus: "fulfilled",
        addRoomCategoryError: "",
      };
    })
    .addCase(addRoomCategory.rejected, (state, action) => {
      return {
        ...state,
        addRoomCategoryStatus: "rejected",
        addRoomCategoryError: action.payload,
      };
    })

    //get All rooms category

    .addCase(getAllRoomsCategory.pending, (state) => {
      return {
        ...state,
        isLoading:true,
        getRoomCategoryStatus: "pending",
        getRoomCategoryError: "",
      };
    })
    .addCase(getAllRoomsCategory.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading:false,
        roomCategory: action.payload,
        getRoomCategoryStatus: "success",
        getRoomCategoryError: "",
      };
    })
    .addCase(getAllRoomsCategory.rejected, (state, action) => {
      return {
        ...state,
        isLoading:false,
        getRoomCategoryStatus: "rejected",
        getRoomCategoryError: action.payload,
      };
    })

    //get All rooms category By Id

    .addCase(getRoomsCategoryById.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        getRoomCategoryByIdStatus: "pending",
        getRoomCategoryByIdError: "",
      };
    })
    .addCase(getRoomsCategoryById.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        roomCategoryById: action.payload,
        getRoomCategoryByIdStatus: "success",
        getRoomCategoryByIdError: "",
      };
    })
    .addCase(getRoomsCategoryById.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        getRoomCategoryByIdStatus: "rejected",
        getRoomCategoryByIdError: action.payload,
      };
    })

    //Delete Room

    .addCase(deleteRoomCategory.pending, (state) => {
      return {
        ...state,
        deleteRoomCategoryStatus: "pending",
        deleteRoomCategoryError: "",
      };
    })
    .addCase(deleteRoomCategory.fulfilled, (state, action) => {
      const currentRoomCategory = state.roomCategory.filter(
        (room) => room._id !== action.payload._id
      );

      return {
        ...state,
        roomCategory: currentRoomCategory,
        deleteRoomCategoryStatus: "success",
        deleteRoomCategoryError: "",
      };
    })
    .addCase(deleteRoomCategory.rejected, (state, action) => {
      return {
        ...state,
        deleteRoomCategoryStatus: "rejected",
        deleteRoomCategoryError: action.payload,
      };
    })

    //update room category
    
    .addCase(updateRoomCategory.pending, (state) => {
      return {
        ...state,
        updateRoomCategoryStatus: "pending",
        updateRoomCategoryError: "",
      };
    })
    .addCase(updateRoomCategory.fulfilled, (state, action) => {
      const updateRoomCategory = state.roomCategory.map((roomCategory) =>
        roomCategory._id === action.payload? action.payload: roomCategory
      );
      return {
        ...state,
        roomCategory: updateRoomCategory,
        updateRoomCategoryStatus: "fulfilled",
        updateRoomCategoryError: "",
      };
    })
    .addCase(updateRoomCategory.rejected, (state, action) => {
      return {
        ...state,
        updateRoomCategoryStatus: "rejected",
        updateRoomCategoryError: action.payload,
      };
    });
  },
});


export default roomCategorySlice.reducer;
