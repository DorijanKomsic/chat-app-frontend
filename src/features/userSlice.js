import { createSlice }from '@reduxjs/toolkit';
import appApi from '../services/appApi';


export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addNotifications: (state, {payload}) => {

        },
        resetNotifications: (state, {payload}) => {

        }
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFullfilled, (state, {payload}) => payload);
        // save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFullfilled, (state, {payload}) => payload);
        // destroy user session after logut
        builder.addMatcher(appApi.endpoints.logoutUser.matchFullfilled, () => null);
    }
})

export const {addNotifications, resetNotifications} = userSlice.actions;
export default userSlice.reducer;