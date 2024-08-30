import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    logout: () => {
      return initialState; 
    },
    updateUserFields: (state, action) => {
      if (state.user) {
        const { path, value } = action.payload;
        const keys = path.split('.');
        let current = state.user;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }
    },
    updateRoleTitle: (state, action) => {
      if (state.user) {
        console.log("insidde update role if")
        state.user.data.user.role.title = action.payload;
      }
    },
  },
});

export const { setUser, clearUser,logout, updateUserFields, updateRoleTitle } = userSlice.actions;
export default userSlice.reducer;
