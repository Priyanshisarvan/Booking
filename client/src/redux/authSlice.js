import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import UserApi from "../Api/UserApi.js";

const token = sessionStorage.getItem("token");
const name = sessionStorage.getItem("name");
const role = sessionStorage.getItem("role");

const initialState = {
  isLoading: false,
  isSignUp: false,
  isLogin: false,

  token: token,
  name: name,
  role: role,

  user: [],
  userCount: [],
  allUser: [],
  getUserDataByTokenId: [],

  error: "",
  signUpStatus: "",
  signInStatus: "",

  forgotPasswordStatus: "",
  resetPasswordStatus: "",
  getDataByTokenError: "",

  getUsersStatus: "",
  getUsersError: "",

  getUserDataByTokenIdStatus: "",
  getUserDataByTokenIdError: "",

  getUserCountStatus: "",
  getUserCountError: "",

  deleteUserStatus: "",
  deleteUserError: "",
};

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userData, thunkApi) => {
    try {
      const result = await UserApi.post("signUp", userData);
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

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await UserApi.post("login", userData);
      toast.success(result.data.message);
      if (result.data.data.is_admin) {
        sessionStorage.setItem("role", "Admin");
      } else {
        sessionStorage.setItem("role", "User");
      }
      sessionStorage.setItem("token", result.data.data.token);
      sessionStorage.setItem("name", result.data.data.name);

      return result.data;
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

export const getUserDataByTokenId = createAsyncThunk(
  "user/getUserDataByToken",
  async (thunkApi) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const result = await UserApi.get("getUserByTokenId", config);
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await UserApi.post("forgotPassword", {
        email: userData.email,
      });

      toast.success(result.data.message);
      return result.data;
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

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const result = await UserApi.post(`resetPassword?token=${token}`, {
        password,
        token,
      });
      toast.success(result.data.message);
      sessionStorage.clear();
      return result.data;
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

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await UserApi.get("getAllUsers");
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

export const getUserCount = createAsyncThunk(
  "user/getUserCount",
  async (id = null, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await UserApi.get("getUserCount", config);
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await UserApi.patch(
        "deleteUser/" + data.id,
        { deleteReason: data.deleteReason },
        config
      );
      toast.success(response.data.message);
      dispatch(getAllUsers());
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserApi.patch("updateUser/" + data.id, data);
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

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state = initialState) => {
      sessionStorage.clear();
      return {
        ...state,
        isLogin: false,
        name: "",
        token: "",
        role: "",
      };
    },
  },
  extraReducers: (builder) => {
    //Sign Up

    builder
      .addCase(signUpUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          signUpStatus: "pending",
          error: null,
          isSignUp: false,
        };
      })
      .addCase(signUpUser.fulfilled, (state) => {
        return {
          ...state,
          isLoading: false,
          signUpStatus: "fulfilled",
          error: null,
          isSignUp: true,
        };
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          signUpStatus: "rejected",
          error: payload,
          isSignUp: false,
        };
      })

      //Sign In

      .addCase(signInUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
          signInStatus: "pending",
        };
      })
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          isLogin: true,
          signInStatus: "fulfilled",
          token: payload.data.token,
          user: payload.data,
        };
      })
      .addCase(signInUser.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: true,
          error: payload,
          signInStatus: "rejected",
        };
      })

      // Get All Users

      .addCase(getAllUsers.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          getUsersStatus: "pending",
          getUsersError: "",
        };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          allUser: action.payload,
          getUsersStatus: "success",
          getUsersError: "",
        };
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getUsersStatus: "rejected",
          getUsersError: action.payload,
        };
      })

      // Get All Users by Token Id

      .addCase(getUserDataByTokenId.pending, (state, action) => {
        return {
          ...state,
          getUserDataByTokenIdStatus: "pending",
          getUserDataByTokenIdError: "",
        };
      })
      .addCase(getUserDataByTokenId.fulfilled, (state, action) => {
        return {
          ...state,
          getUserDataByTokenId: action.payload,
          getUserDataByTokenIdStatus: "success",
          getUserDataByTokenIdError: "",
        };
      })
      .addCase(getUserDataByTokenId.rejected, (state, action) => {
        return {
          ...state,
          getUserDataByTokenIdStatus: "rejected",
          getUserDataByTokenIdError: action.payload,
        };
      })

      //get user Count

      .addCase(getUserCount.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getUserCountStatus: "pending",
          getUserCountError: "",
        };
      })
      .addCase(getUserCount.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          userCount: action.payload,
          getUserCountStatus: "success",
          getUserCountError: "",
        };
      })
      .addCase(getUserCount.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getUserCountStatus: "rejected",
          getUserCountError: action.payload,
        };
      })

      //delete user

      .addCase(deleteUser.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          deleteUserStatus: "pending",
          deleteUserError: "",
        };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          deleteUserStatus: "success",
          deleteUserError: "",
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          deleteUserStatus: "rejected",
          deleteUserError: action.payload,
        };
      })

      //forgot password

      .addCase(forgotPassword.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          error: null,
          forgotPasswordStatus: "pending",
        };
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          isLogin: true,
          token: payload.token,
          forgotPasswordStatus: "fulfilled",
        };
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: true,
          error: payload,
          forgotPasswordStatus: "rejected",
        };
      })

      //reset password

      .addCase(resetPassword.pending, (state) => {
        return {
          ...state,
          error: null,
          isLoading: true,
          resetPasswordStatus: "pending",
        };
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          isLogin: true,
          resetPasswordStatus: "fulfilled",
        };
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: true,
          error: payload,
          resetPasswordStatus: "rejected",
        };
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
