import { combineReducers } from 'redux';

import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
    authentication: authSlice,
});

export default rootReducer;
