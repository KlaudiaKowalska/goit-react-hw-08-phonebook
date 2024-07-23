import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.get(`${BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.post(`${BASE_URL}/contacts`, contact, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (contactId, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    await axios.delete(`${BASE_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return contactId;
  },
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => action.payload)
      .addCase(addContact.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        return state.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
