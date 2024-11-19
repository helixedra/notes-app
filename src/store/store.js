import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./notesSlice";

export default configureStore({
  reducer: {
    notes: noteReducer,
  },
});
