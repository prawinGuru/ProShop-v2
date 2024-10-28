import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import cartSliceReducer from './slices/cartSlice.js';

const store = configureStore({
    reducer: {

        // To add state logic for different features (like cart management here), you add reducers from different slices to the store. 
        // This enables the store to manage state updates based on actions across the entire application.
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
    },

    //  intercept actions before they reach the reducer  like async operations, logging, error handling, etc.
    // getDefaultMiddleware() returns an array of the default middleware.
// .concat(apiSlice.middleware) adds apiSlice.middleware to that array.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store; 

// Example Workflow of Middleware
// When an API request is made through RTK Query:

// The apiSlice.middleware intercepts the action, processes it (like caching, tracking loading state), and then forwards the action to the reducer if needed.
// Additional logic, like handling errors or retrying requests, can also happen within the middleware before the state is updated.