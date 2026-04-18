import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  token: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
}
const storedUser = localStorage.getItem("user");

const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : {
      token: null,
      username: null,
      email: null,
      role: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        username: string;
        email: string;
        role: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      localStorage.setItem("user", JSON.stringify(state));
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      localStorage.setItem("user", JSON.stringify(state));
    },

    logout: (state) => {
      state.token = null;
      state.username = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;