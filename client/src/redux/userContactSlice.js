import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userContactApi from "../Api/userContactApi.js";

const token = sessionStorage.getItem("token");

const initialState = {
  isLoading: false,
  token: token,
  userContact: [],
  contactDataById: [],

  error: "",
  addUserContactStatus: "",
  addUserContactError: "",

  getAllUserContactStatus: "",
  getAllUserContactError: "",

  getUserContactDetailByIdStatus: "",
  getUserContactDetailByIdError: "",

  deleteUserContactStatus: "",
  deleteUserContactError: "",
};

export const addUserContact = createAsyncThunk(
  "userContact/addUserContact",
  async (userData, thunkApi) => {
    try {
      const result = await userContactApi.post("addUserContact", userData);
      toast.success(result.data.message);
      return result.data;
    } catch (error) {
      if (error) {
        toast.error(error.response.data);
        return thunkApi.rejectWithValue(error.response.data);
      } else {
        return thunkApi.rejectWithValue("Something Went wrong");
      }
    }
  }
);

export const getAllUserContact = createAsyncThunk(
  "userContact/getAllUserContact",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await userContactApi.get("getAllUsersContact", config);
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

export const userContactStatusUpdate = createAsyncThunk(
  "userContact/userContactStatusUpdate",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await userContactApi.patch("userContactStatusUpdate/" + id,{},config);
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

export const getUserContactDetailById = createAsyncThunk(
  "userContact/getUserContactDetailById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await userContactApi.get("getUserContactDetailById/" + id,config);
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

export const deleteUserContact = createAsyncThunk(
  "userContact/deleteUserContact",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await userContactApi.delete("deleteUserContact/" + id,config);
      dispatch(getAllUserContact());
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

export const userContactSlice = createSlice({
  name: "userContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    // Add User Contact

      .addCase(addUserContact.pending, (state) => {
        return {
          ...state,
          addUserContactStatus: "pending",
          addUserContactError: "",
        };
      })
      .addCase(addUserContact.fulfilled, (state, action) => {
        return {
          ...state,
          addUserContactStatus: "fulfilled",
          addUserContactError: "",
        };
      })
      .addCase(addUserContact.rejected, (state, action) => {
        return {
          ...state,
          addUserContactStatus: "rejected",
          addUserContactError: action.payload,
        };
      })

      // Get All Users Contact

      .addCase(getAllUserContact.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          getAllUserContactStatus: "pending",
          getAllUserContactError: "",
        };
      })
      .addCase(getAllUserContact.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          userContact: action.payload,
          getAllUserContactStatus: "success",
          getAllUserContactError: "",
        };
      })
      .addCase(getAllUserContact.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAllUserContactStatus: "rejected",
          getAllUserContactError: action.payload,
        };
      })

      //Delete User Contact

      .addCase(deleteUserContact.pending, (state) => {
        return {
          ...state,
          deleteUserContactStatus: "pending",
          deleteUserContactError: "",
        };
      })
      .addCase(deleteUserContact.fulfilled, (state, action) => {
         
        return {
          ...state,
          deleteUserContactStatus: "success",
          deleteUserContactError: "",
        };
      })
      .addCase(deleteUserContact.rejected, (state, action) => {
        return {
          ...state,
          deleteUserContactStatus: "rejected",
          deleteUserContactError: action.payload,
        };
      })

      //Get User Contact Detail
      
      .addCase(getUserContactDetailById.pending, (state) => {
        return {
          ...state,
          isisLoading: true,
          getUserContactDetailByIdStatus: "pending",
          getUserContactDetailByIdError: "",
        };
      })
      .addCase(getUserContactDetailById.fulfilled, (state, action) => {
        return {
          ...state,
          isisLoading: false,
          contactDataById: action.payload,
          getUserContactDetailByIdStatus: "success",
          getUserContactDetailByIdError: "",
        };
      })
      .addCase(getUserContactDetailById.rejected, (state, action) => {
        return {
          ...state,
          isisLoading: false,
          getUserContactDetailByIdStatus: "rejected",
          getUserContactDetailByIdError: action.payload,
        };
      });
  },
});

export default userContactSlice.reducer;
