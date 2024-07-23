import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://6693d743c6be000fa07d5f4c.mockapi.io/api/v1";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact) => {
    const response = await axios.post(`${BASE_URL}/contacts`, contact);
    return response.data;
  },
);

export const removeContact = createAsyncThunk(
  "contacts/removeContact",
  async (contactId) => {
    await axios.delete(`${BASE_URL}/contacts/${contactId}`);
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
