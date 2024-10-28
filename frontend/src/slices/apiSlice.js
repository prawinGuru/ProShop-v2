import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants.js';

// Setting base URL
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
baseQuery,

// updates specific part of state
// used to identify and manage different types of data in the API slice.
tagTypes: ['Product', 'Order', 'User'],

// Function where you define specific API emdpoints
// The builder parameter is used to create endpoints.
endpoints: (builder) => ({}),
});