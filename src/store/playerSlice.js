// https://api.opendota.com/api/teams/1838315/players
import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPlayerById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId, thunkAPI) => {
    const response = await axios.get(`https://api.opendota.com/api/teams/${userId}/players`);
    // const response = fetch(`https://api.opendota.com/api/teams/${userId}/players`)
    //   .then(res => res.json())
    //   .then(data => data)
    //   .catch(err => Promise.reject(err));
    // return thunkAPI.rejectWithValue("Goi api loi roi ban oi!!!! @@@"); // it send to payload in rejected promise
    // return Promise.reject("Loi roi ban eiiiiiiiiiiiiiii");
    return response.data;
  },
  {
    condition: (userId, { getState, extra }) => {
      const data = getState();
      console.log("data from condition:", data);
      return false;
    },
  }
);

const initialState = {
  listPlayers: [],
  status: "",
  messageError: "",
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPlayerById.fulfilled, (state, action) => {
      state.status = "";
      state.listPlayers = action.payload;
    });

    builder.addCase(fetchPlayerById.rejected, (state, action) => {
      console.log("action when rejected:", action);
      state.status = "failed";
      state.messageError = action.error.message;
    });

    builder.addCase(fetchPlayerById.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export const listPlayersSelector = state => state.players.listPlayers;
export const statusSelector = state => state.players.status;
export const messageErrorSelector = state => state.players.messageError;

export default playersSlice.reducer;
