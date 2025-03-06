import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants'


const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});//fetchbasequert by default checks "proxy" in FE package.json


//parent slice
export const apiSlice =createApi({
    baseQuery,
    tagTypes:['Product','Order','User'],
    endpoints:(builder)=>({})
})