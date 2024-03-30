import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../services/AxiosInstance";
import * as Endpoints from '../endpoints';

export const googlesignin = createAsyncThunk(
     "googlesignin",
     async (data, { rejectWithValue, getState }) => {
       const URL = Endpoints.GOOGLE_SIGNIN;
       try {

        let res = await AxiosInstance.get(URL);
        console.log(`googlesignin response: ${res.data}`);
        return { data, response: res.data };

       } catch (error) {

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
 