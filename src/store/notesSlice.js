import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now(), // Generate a unique ID
        ...action.payload, // Include title and content from payload
      };
      state.push(newNote);
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload);
    },
    changeNote: (state, action) => {
      const { id, title, content } = action.payload;
      const note = state.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, deleteNote, changeNote } = notesSlice.actions;
export default notesSlice.reducer;
