import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Creates a new slice, productsApiSlice, which extends apiSlice by injecting new endpoints specific to products.
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // POST Api
        login: builder.mutation({

            // actual HTTP request configuration:
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),

logout: builder.mutation({
    query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
    })
}),

profile: builder.mutation({
    query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
    })
})
    }),
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation} = usersApiSlice;