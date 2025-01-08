import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../service";

export const logout = createAsyncThunk(
    'logout',
    async (email, { rejectWithValue }) => {  // Using getState instead of parameter
      try {
        console.log("hitting logout in store...");
        console.log("email..."+email);
        const response = await api.post("/customLogout", {email} );
        // const navigate = useNavigate();
        // navigate("/login");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const initialState = {
    user: {
        id:"",
        email:""
    },
    isAuthenticated:false
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        login(state,actions){
            console.log("inside login...");
            state.isAuthenticated = true;
            state.user = {
                id: actions.payload.id,
                email: actions.payload.email
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(logout.fulfilled, (state, action) =>{
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });
        state.isAuthenticated = false;
        state.user = {
          id: "",
          email: ""
        };
        })
        .addCase(logout.rejected, (state, action) => {
        Cookies.remove("accessToken", { path: "/" });
        Cookies.remove("refreshToken", { path: "/" });
        state.isAuthenticated = false;
        state.user = {
          id: "",
          email: ""
        };
        });
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;