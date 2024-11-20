import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const getInitialState = () => {
  const storedNotes = localStorage.getItem("notes");
  return storedNotes ? JSON.parse(storedNotes) : [];
};

const notesSlice = createSlice({
  name: "notes",
  initialState: getInitialState(),
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: uuidv4(),
        ...action.payload,
      };
      state.push(newNote);

      localStorage.setItem("notes", JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      const updatedState = state.filter((note) => note.id !== action.payload);

      localStorage.setItem("notes", JSON.stringify(updatedState));
      return updatedState;
    },
    changeNote: (state, action) => {
      const { id, title, content } = action.payload;
      const note = state.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }

      localStorage.setItem("notes", JSON.stringify(state));
    },
  },
});

export const { addNote, deleteNote, changeNote } = notesSlice.actions;
export default notesSlice.reducer;
