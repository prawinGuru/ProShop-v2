import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Creates a new slice, productsApiSlice, which extends apiSlice by injecting new endpoints specific to products.
export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // get Api
        getProducts: builder.query({

            // actual HTTP request configuration:
            query: () => ({
                url: PRODUCTS_URL,
            }),

            // to keep cached data for 5 seconds after it’s no longer used by any component. 
            // This prevents unnecessary re-fetching if the data is briefly unmounted and then remounted.
            keepUnusedDataFor: 5,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        })
    }),
})

export const {useGetProductsQuery, useGetProductDetailsQuery} = productsApiSlice;