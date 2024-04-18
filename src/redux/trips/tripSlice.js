import { createSlice } from "@reduxjs/toolkit";
import {  
  getTripDetails,

  createTodoDetails,
  getTodoDetails,
  editTodoDetails,
  deleteTodoDetails,

  createPackingListDetails,
  getPackingListDetails,
  editListItemDetails,
  deleteListItemDetails,

  createNoteDetails,
  getNoteDetails,
  deleteNoteDetails,

  createDocumentDetails,
  getDocumentDetails,
  deleteDocumentDetails,

  getBookingDetails,
  deleteBookingDetails,

  getItineraryDetails
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
      Object.assign(state, initialState);
    },
    resetObjectState: (state, action) => {
      const objectName = action.payload;
      if (state.hasOwnProperty(objectName)) {
        state[objectName] = initialState[objectName];
      } else {
        console.error(`Object '${objectName}' does not exist in the state.`);
      }
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


     builder.addCase(createTodoDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(createTodoDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.todoDetails = payload?.response?.todos;
     });
     builder.addCase(createTodoDetails.rejected, (state, { payload }) => {
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


     builder.addCase(editTodoDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(editTodoDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(editTodoDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(deleteTodoDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(deleteTodoDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(deleteTodoDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(createPackingListDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(createPackingListDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.listDetails = payload?.response?.list;
     });
     builder.addCase(createPackingListDetails.rejected, (state, { payload }) => {
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


     builder.addCase(editListItemDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(editListItemDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(editListItemDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(deleteListItemDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(deleteListItemDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(deleteListItemDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(createNoteDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(createNoteDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.noteDetails = payload?.response?.notes;
     });
     builder.addCase(createNoteDetails.rejected, (state, { payload }) => {
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
       state.noteDetails = payload?.response?.list;
     });
     builder.addCase(getNoteDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(deleteNoteDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(deleteNoteDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(deleteNoteDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(createDocumentDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(createDocumentDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.documentDetails = payload?.response?.list;
     });
     builder.addCase(createDocumentDetails.rejected, (state, { payload }) => {
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
       state.documentDetails = payload?.response?.list;
     });
     builder.addCase(getDocumentDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(deleteDocumentDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(deleteDocumentDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(deleteDocumentDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getBookingDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getBookingDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.bookingDetails = payload?.response?.list;
     });
     builder.addCase(getBookingDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(deleteBookingDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(deleteBookingDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
     });
     builder.addCase(deleteBookingDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });


     builder.addCase(getItineraryDetails.pending, (state) => {
       state.loading = true;
     });
     builder.addCase(getItineraryDetails.fulfilled, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.success = true;
       state.itineraryDetails = payload?.response?.itinerary;
     });
     builder.addCase(getItineraryDetails.rejected, (state, { payload }) => {
       console.log(payload);
       state.loading = false;
       state.status = payload?.status;
       state.error = true;
       state.message = payload?.data?.message;
     });
    
   },
 });
 

 export default tripSlice.reducer