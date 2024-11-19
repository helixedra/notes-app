import { useState, useRef } from "react";
import Note from "./Note";
import { useSelector, useDispatch } from "react-redux";
import { addNote, changeNote } from "./store/notesSlice.js";
import Dialog from "./components/Dialog.jsx";

function App() {
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [dialog, setDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const contentRef = useRef();

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  function handleAddNote() {
    dispatch(
      addNote({
        title: formTitle,
        content: formContent,
      })
    );
    handleDialog();
    handleClearForm();
  }
  function handleCancel() {
    setEditMode(false);
    handleDialog();
    handleClearForm();
  }

  function handleClearForm() {
    setFormTitle("");
    setFormContent("");
  }

  function handleEditNote(id) {
    setEditMode(true);
    if (id) {
      const note = notes.find((note) => note.id === id);
      setSelectedNote(note);
      setFormTitle(note.title);
      setFormContent(note.content);
      handleDialog();
    }
  }

  function handleFormTitle(e) {
    setFormTitle(e.target.value);
  }
  function handleFormContent(e) {
    contentRef.current.style = `height: ${e.target.scrollHeight}px;`;
    setFormContent(e.target.value);
  }

  function handleDialog() {
    setDialog((state) => !state);
  }

  function handleSaveNote() {
    if (selectedNote !== null) {
      const id = selectedNote.id;
      const newState = {
        title: formTitle,
        content: formContent,
      };

      dispatch(changeNote({ id, ...newState }));

      setEditMode(false);
      handleDialog();
      handleClearForm();
    }
  }
  return (
    <>
      <main>
        <div className="toolbar">
          <button className="add_note" onClick={handleDialog}>
            Add Note
          </button>
        </div>

        <div className="grid_container">
          {notes.map((item) => {
            return <Note {...item} key={item.id} edit={handleEditNote} />;
          })}
        </div>
      </main>
      <Dialog dialog={dialog} cancel={handleCancel}>
        <div className="add_note_form">
          <input
            placeholder="Title"
            className="editable_title_area"
            value={formTitle}
            onChange={(e) => handleFormTitle(e)}
          ></input>
          <textarea
            ref={contentRef}
            value={formContent}
            onChange={(e) => handleFormContent(e)}
            className="editable_content_area"
            placeholder="Take a note…"
          ></textarea>
          <button
            className="save_button"
            onClick={editMode ? handleSaveNote : handleAddNote}
          >
            Save
          </button>
          <button className="cancel_button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default App;
