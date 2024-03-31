import { createSlice } from "@reduxjs/toolkit";
import {  googlesignin, emailsignin } from "./authActions";

const initialState = {
    loading: false,
    deviceInfo: {},
    userInfo: null,
    error: null,
    success: false,
    message: null,
    status: null
}

export const authSlice = createSlice({
   name: "authentication",
   initialState,
   reducers: {
    resetError: (state) => {
      state.loading = false;
      state.error = false;
      state.message = null;
      state.userInfo = null;
      state.success = false;
      state.status = null;
    },
  },
   extraReducers: (builder) => {
     builder.addCase(googlesignin.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(googlesignin.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.userInfo = payload?.response?.data;
     });
     builder.addCase(googlesignin.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


    builder.addCase(emailsignin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(emailsignin.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.userInfo = payload?.response?.user;
    });
    builder.addCase(emailsignin.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.status = payload?.status;
      state.error = true;
      state.message = payload?.message;
    });
    
   },
 });
 

 export default authSlice.reducer