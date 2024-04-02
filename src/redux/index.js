import { combineReducers } from 'redux';

import authSlice from './auth/authSlice';
import tripSlice from './trips/tripSlice';

const rootReducer = combineReducers({
    authentication: authSlice,
    trip: tripSlice
});

export default rootReducer;
