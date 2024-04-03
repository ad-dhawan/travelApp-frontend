import { createAsyncThunk } from "@reduxjs/toolkit";
import { Linking } from "react-native";

import { AxiosInstance } from "../../services/AxiosInstance";
import * as Endpoints from '../endpoints';

export const getTripDetails = createAsyncThunk(
     "getTripDetails",
     async (data, { rejectWithValue, getState }) => {
        const { token, userInfo } = getState().authentication
        const URL = `${Endpoints.GET_TRIP_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripIds=${userInfo.trips.join(',')}`;
       try {

        let res = await AxiosInstance.get(URL);
        console.log(`getTripDetails response: ${res.data}`);
        return { response: res.data };

       } catch (error) {
          console.log(`getTripDetails error: `, error)
         if (error.response) {
           return rejectWithValue({
             status: error.response.status,
             data: error.response.data,
           });
         } else {
           return rejectWithValue({
             status: -1,
             data: { message: "Network Error" },
           });
         }

       }
     }
);

export const getTodoDetails = createAsyncThunk(
    "getTodoDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_TODO_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripId=${data.tripId}`;
      try {
       let res = await AxiosInstance.get(URL);
       console.log(`getTodoDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`getTodoDetails error: `, error)
        if (error.response) {
          return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          return rejectWithValue({
            status: -1,
            data: { message: "Network Error" },
          });
        }

      }
    }
);

export const getPackingListDetails = createAsyncThunk(
    "getPackingListDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_PACKING_LIST_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripId=${data.tripId}`;
      try {

       let res = await AxiosInstance.get(URL);
       console.log(`getPackingListDetails response: ${res.data}`);
       return { response: res.data };

      } catch (error) {
         console.log(`getPackingListDetails error: `, error)
        if (error.response) {
          return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          return rejectWithValue({
            status: -1,
            data: { message: "Network Error" },
          });
        }

      }
    }
);

export const getNoteDetails = createAsyncThunk(
    "getNoteDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_NOTE_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripId=${data.tripId}`;
      try {

       let res = await AxiosInstance.get(URL);
       console.log(`getNoteDetails response: ${res.data}`);
       return { response: res.data };

      } catch (error) {
         console.log(`getNoteDetails error: `, error)
        if (error.response) {
          return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          return rejectWithValue({
            status: -1,
            data: { message: "Network Error" },
          });
        }

      }
    }
);

export const getDocumentDetails = createAsyncThunk(
    "getDocumentDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_DOCUMENT_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripId=${data.tripId}`;
      try {

       let res = await AxiosInstance.get(URL);
       console.log(`getDocumentDetails response: ${res.data}`);
       return { response: res.data };

      } catch (error) {
         console.log(`getDocumentDetails error: `, error)
        if (error.response) {
          return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          return rejectWithValue({
            status: -1,
            data: { message: "Network Error" },
          });
        }

      }
    }
);

export const getBookingDetails = createAsyncThunk(
    "getBookingDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_BOOKING_DETAILS}?userId=${userInfo._id}&authToken=${token}&tripId=${data.tripId}`;
      try {

       let res = await AxiosInstance.get(URL);
       console.log(`getBookingDetails response: ${res.data}`);
       return { response: res.data };

      } catch (error) {
         console.log(`getBookingDetails error: `, error)
        if (error.response) {
          return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          return rejectWithValue({
            status: -1,
            data: { message: "Network Error" },
          });
        }

      }
    }
);
 