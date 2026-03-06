import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, getUserAPI, logoutAPI } from "./authAPI";

// loginUser - With help of async thunk, it sends the login data to the server using the loginAPI function.
export const loginUser = createAsyncThunk (
    "auth/login", 
    // data - The login data that will be sent to the server for authentication.
    // thunkAPI - Access to the current state and dispatch actions.
    async (data, thunkAPI) => {
        try {
            await loginAPI(data);
            const user = await getUserAPI();
            return user;
        } catch (err) {
            // Login failed - Action is rejected with an error message
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
)

// logoutUser - Sent logout request to the server using logoutAPI function.
export const logoutUser = createAsyncThunk(
    "auth/logout",
    // _ - No data is needed for logout
    async (_, thunkAPI) => {
        try {
            await logoutAPI();
            return true;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Logout failed"
            );
        }
    }
)

const authSlice = createSlice ({
    // creaeSlice - Create a slice of react state for auth
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    },
    reducers: {},

    // extraReducers - Handle login and logout states (pending, fullfilled, rejected) and update state
        extraReducers: (builder) => {
        builder

        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
         
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }) 

        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
        })
    },
});

export default authSlice.reducer;