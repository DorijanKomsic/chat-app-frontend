import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost/5001'
    }),
    endpoints: (builder) => {
        // create user
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
        })
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user
            })
        })
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/user/logout',
                method: 'DELETE',
                body: payload
            })
        })
    }
});

export const {useSignUpUserMutation, useLoginUserMutation, useLogoutUserMutation} = appApi

export default appApi;