import { useState, useRef, useEffect } from "react";
import Note from "./Note";
import { useSelector, useDispatch } from "react-redux";
import { addNote, changeNote } from "./store/notesSlice.js";
import Dialog from "./components/Dialog.jsx";
import Masonry from "react-masonry-css";

function App() {
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [dialog, setDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Налаштування колонок
  const breakpointColumnsObj = {
    default: 5,
    1644: 4,
    1328: 3,
    1012: 2,
    712: 1,
  };

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
    contentRef.current.style.removeProperty("height");
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
    const textarea = e.target;

    // Dynamically adjust height based on scrollHeight
    textarea.style.height = "auto"; // Reset height to auto before recalculating
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scrollHeight

    setFormContent(e.target.value);
  }

  // function getTextareaHeight(){
  //   contentRef.current.style = `height: ${e.target.scrollHeight}px;`;
  // }

  function handleDialog() {
    setDialog((state) => !state);
  }
  useEffect(() => {
    if (dialog && contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [dialog]);

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

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map((item) => {
            return <Note {...item} key={item.id} edit={handleEditNote} />;
          })}
        </Masonry>
      </main>
      <Dialog dialog={dialog}>
        <div className="add_note_form">
          <div className="container">
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
          </div>

          <div className="controls">
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
        </div>
      </Dialog>
    </>
  );
}

export default App;
