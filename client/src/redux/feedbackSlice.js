import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import feedbackApi from "../Api/feedbackApi.js";

const token = sessionStorage.getItem("token");

const initialState = {
  token: token,
  isLoading: false,

  feedback: [],
  getFeedbackById: [],
  feedbackById:[],

  error: "",
  addFeedbackStatus: "",
  addFeedbackError: "",

  getAllFeedbackStatus: "",
  getAllFeedbackError: "",

  deleteFeedbackStatus: "",
  deleteFeedbackError: "",

  getFeedbackByIdStatus: "",
  getFeedbackByIdError: "",
};

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await feedbackApi.post("addfeedback", data, config);
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

export const getAllFeedback = createAsyncThunk(
  "feedback/getAllFeedback",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await feedbackApi.get("getAllFeedback");
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

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await feedbackApi.delete(
        "deleteFeedback/" + _id,
        config
      );
      dispatch(getAllFeedback());
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
export const getFeedbackDetailById = createAsyncThunk(
  "userContact/getFeedbackDetailById",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await feedbackApi.get("getFeedbackById/" + id, config);
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
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //Add feedback

    builder
      .addCase(addFeedback.pending, (state) => {
        return {
          ...state,
          addFeedbackStatus: "pending",
          addFeedbackError: "",
        };
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        return {
          ...state,
          addFeedbackStatus: "fulfilled",
          addFeedbackError: "",
        };
      })
      .addCase(addFeedback.rejected, (state, action) => {
        return {
          ...state,
          addFeedbackStatus: "rejected",
          addFeedbackError: action.payload,
        };
      })

      //get All Feedback

      .addCase(getAllFeedback.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getAllFeedbackStatus: "pending",
          getAllFeedbackError: "",
        };
      })
      .addCase(getAllFeedback.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          feedback: action.payload,
          getAllFeedbackStatus: "success",
          getAllFeedbackError: "",
        };
      })
      .addCase(getAllFeedback.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getAllFeedbackStatus: "rejected",
          getAllFeedbackError: action.payload,
        };
      })

       //get Feedback detail by id

       .addCase(getFeedbackDetailById.pending, (state) => {
        return {
          ...state,
          isLoading: true,
          getFeedbackByIdStatus: "pending",
          getFeedbackByIdError: "",
        };
      })
      .addCase(getFeedbackDetailById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          feedbackById: action.payload,
          getFeedbackByIdStatus: "success",
          getFeedbackByIdError: "",
        };
      })
      .addCase(getFeedbackDetailById.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          getFeedbackByIdStatus: "rejected",
          getFeedbackByIdError: action.payload,
        };
      })
  },
});

export default feedbackSlice.reducer;
