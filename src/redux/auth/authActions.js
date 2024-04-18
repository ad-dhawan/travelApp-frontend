import { createAsyncThunk } from "@reduxjs/toolkit";
import { Linking } from "react-native";

import { AxiosInstance } from "../../services/AxiosInstance";
import * as Endpoints from '../endpoints';

export const googlesignin = createAsyncThunk(
     "googlesignin",
     async (data, { rejectWithValue, getState }) => {
       const URL = Endpoints.GOOGLE_SIGNIN;
       try {

        let res = await AxiosInstance.get(URL);
        console.log(`googlesignin response: ${res.data}`);
        await Linking.openURL(res.data)
        return { response: res.data };


       } catch (error) {
          console.log(`Google SignIn error: `, error)
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

export const emailsignin = createAsyncThunk(
     "emailsignin",
     async (data, { rejectWithValue, getState }) => {
       const URL = Endpoints.EMAIL_SIGNIN;
       try {

        let res = await AxiosInstance.post(URL, data);
        console.log(`emailsignin response: ${res.data}`);
        return { response: res.data };

       } catch (error) {
          console.log(`Email SignIn error: `, error)
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

export const getUser = createAsyncThunk(
  "getUser",
  async (data, { rejectWithValue, getState }) => {
    const { token, userInfo } = getState().authentication;
    const URL = `${Endpoints.GET_USER}?userId=${userInfo._id}&authToken=${token}&searchUser=${userInfo._id}`;
    try {

     let res = await AxiosInstance.get(URL);
     console.log(`getUser response: ${res.data}`);
     return { response: res.data };

    } catch (error) {
       console.log(`getUser error: `, error)
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
 