import { createAsyncThunk } from "@reduxjs/toolkit";
import { Linking } from "react-native";

import { AxiosInstance } from "../../services/AxiosInstance";
import * as Endpoints from '../endpoints';

const FILE_NAME = 'tripActions.js'

export const getTripDetails = createAsyncThunk(
     "getTripDetails",
     async (data, { rejectWithValue, getState }) => {
      console.log(`In ${FILE_NAME}: getTripDetails`)
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

export const createTodoDetails = createAsyncThunk(
    "createTodoDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_TODO_DETAILS}`;
       const body = {
        task: data.task,
        tripId: data.tripId,
        authToken: token,
        userId: userInfo._id
       }
      try {
       let res = await AxiosInstance.post(URL, body);
       console.log(`createTodoDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`createTodoDetails error: `, error)
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

export const editTodoDetails = createAsyncThunk(
    "editTodoDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_TODO_DETAILS}/${data.tripId}/${data.todoId}`;
       const body = {
        status: data.status,
        authToken: token,
        userId: userInfo._id
       }
      try {
       let res = await AxiosInstance.put(URL, body);
       console.log(`editTodoDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`editTodoDetails error: `, error)
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

export const deleteTodoDetails = createAsyncThunk(
    "deleteTodoDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_TODO_DETAILS}/${data.tripId}/${data.todoId}`;
       const config = {
        headers: {
          authToken: token,
          userId: userInfo._id
        }
      };
       
      try {
       let res = await AxiosInstance.delete(URL, config);
       console.log(`deleteTodoDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`deleteTodoDetails error: `, error)
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

export const createPackingListDetails = createAsyncThunk(
    "createPackingListDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_PACKING_LIST_DETAILS}`;
       const body = {
        itemName: data.itemName,
        tripId: data.tripId,
        authToken: token,
        userId: userInfo._id
       }
      try {
       let res = await AxiosInstance.post(URL, body);
       console.log(`createPackingListDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`createPackingListDetails error: `, error)
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

export const editListItemDetails = createAsyncThunk(
    "editListItemDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_PACKING_LIST_DETAILS}/${data.tripId}/${data.itemId}`;
       const body = {
        status: data.status,
        authToken: token,
        userId: userInfo._id
       }
      try {
       let res = await AxiosInstance.put(URL, body);
       console.log(`editListItemDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`editListItemDetails error: `, error)
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

export const deleteListItemDetails = createAsyncThunk(
    "deleteListItemDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_PACKING_LIST_DETAILS}/${data.tripId}/${data.itemId}`;
       const config = {
        headers: {
          authToken: token,
          userId: userInfo._id
        }
      };
       
      try {
       let res = await AxiosInstance.delete(URL, config);
       console.log(`deleteListItemDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`deleteListItemDetails error: `, error)
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

export const createNoteDetails = createAsyncThunk(
    "createNoteDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_NOTE_DETAILS}`;
       const body = {
        note: data.note,
        tripId: data.tripId,
        authToken: token,
        userId: userInfo._id
       }
      try {
       let res = await AxiosInstance.post(URL, body);
       console.log(`createNoteDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`createNoteDetails error: `, error)
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

export const deleteNoteDetails = createAsyncThunk(
    "deleteNoteDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_NOTE_DETAILS}/${data.tripId}/${data.noteId}`;
       const config = {
        headers: {
          authToken: token,
          userId: userInfo._id
        }
      };
       
      try {
       let res = await AxiosInstance.delete(URL, config);
       console.log(`deleteNoteDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`deleteNoteDetails error: `, error)
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

export const deleteDocumentDetails = createAsyncThunk(
    "deleteDocumentDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_DOCUMENT_DETAILS}/${data.tripId}/${data.documentId}`;
       const config = {
        headers: {
          authToken: token,
          userId: userInfo._id
        }
      };
       
      try {
       let res = await AxiosInstance.delete(URL, config);
       console.log(`deleteDocumentDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`deleteDocumentDetails error: `, error)
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

export const deleteBookingDetails = createAsyncThunk(
    "deleteBookingDetails",
    async (data, { rejectWithValue, getState }) => {
       const { token, userInfo } = getState().authentication
       const URL = `${Endpoints.GET_BOOKING_DETAILS}/${data.tripId}/${data.bookingId}`;
       const config = {
        headers: {
          authToken: token,
          userId: userInfo._id
        }
      };
       
      try {
       let res = await AxiosInstance.delete(URL, config);
       console.log(`deleteBookingDetails response: ${res.data}`);
       return { response: res.data };
      } catch (error) {
         console.log(`deleteBookingDetails error: `, error)
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
 