import { createSlice } from "@reduxjs/toolkit";
import {  
  getTripDetails,
  getTodoDetails,
  getPackingListDetails,
  getNoteDetails,
  getDocumentDetails
} from "./tripActions";

const initialState = {
    loading: false,
    tripDetails: [],
    todoDetails: [],
    listDetails: [],
    noteDetails: [],
    documentDetails: [],
    bookingDetails: [],
    transportDetails: [],
    itineraryDetails: [],
    error: null,
    success: false,
    message: null,
    status: null
}

export const tripSlice = createSlice({
   name: "trip",
   initialState,
   reducers: {
    resetError: (state) => {
      state.loading = false;
      state.error = false;
      state.message = null;
      state.success = false;
      state.status = null;
    },
    resetState: (state) => {
      state = initialState
    },
  },
   extraReducers: (builder) => {
     builder.addCase(getTripDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getTripDetails.fulfilled, (state, { payload }) => {
       console.log("get trp payload",payload);
       state.loading = false;
       state.success = true;
       state.tripDetails = payload?.response?.trips;
     });
     builder.addCase(getTripDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getTodoDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getTodoDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.todoDetails = payload?.response?.todos;
     });
     builder.addCase(getTodoDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getPackingListDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getPackingListDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.listDetails = payload?.response?.list;
     });
     builder.addCase(getPackingListDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getNoteDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getNoteDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.noteDetails = payload?.response?.notes;
     });
     builder.addCase(getNoteDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getDocumentDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getDocumentDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.noteDetails = payload?.response?.notes;
     });
     builder.addCase(getDocumentDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });
    
   },
 });
 

 export default tripSlice.reducer