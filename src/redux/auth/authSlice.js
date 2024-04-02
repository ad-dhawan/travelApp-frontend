import { createSlice } from "@reduxjs/toolkit";
import {  googlesignin, emailsignin, getUser } from "./authActions";

const initialState = {
    loading: false,
    deviceInfo: {},
    userInfo: null,
    error: null,
    success: false,
    message: null,
    status: null,
    token: ""
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
    resetState: (state) => {
      state = initialState
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
       state.token = payload?.response?.token;
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
      state.token = payload?.response?.token;
    });
    builder.addCase(emailsignin.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.status = payload?.status;
      state.error = true;
      state.message = payload?.message;
    });


    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.success = true;
      state.userInfo = payload?.response?.user;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.status = payload?.status;
      state.error = true;
      state.message = payload?.message;
    });
    
   },
 });
 

 export default authSlice.reducer