import { createSlice } from "@reduxjs/toolkit";
import {  googlesignin } from "./authActions";

const initialState = {
    loading: false,
    deviceInfo: {},
    userInfo: {},
    userInfo: {},
    error: null,
    success: false,
    message: null,
    status: null
}

export const scanSlice = createSlice({
   name: "googlesignin",
   initialState,
   reducers: {
    resetError: (state) => {
      state.error = false;
      state.message = null;
    },
  },
   extraReducers: (builder) => {
     builder.addCase(googlesignin.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(googlesignin.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.deviceInfo = payload?.response?.data;
     });
     builder.addCase(googlesignin.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true; // Set error to true
       state.message = payload?.data?.message;
     });
    
   },
 });
 

 export default scanSlice.reducer