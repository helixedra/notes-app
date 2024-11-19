import { useState } from "react";
// import data from "./data.json";
import Note from "./Note";
import { useSelector, useDispatch } from "react-redux";
import { addNote } from "./store/notesSlice.js";

function App() {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");

  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  function handleCreateNote() {
    setIsAddingNote(true);
  }

  function handleAddNote() {
    dispatch(
      addNote({
        title: formTitle,
        content: formContent,
      })
    );
    handleClearForm();
  }

  function handleClearForm() {
    setFormTitle("");
    setFormContent("");
    setIsAddingNote(false);
  }

  function handleFromTitle(e) {
    setFormTitle(e.target.value);
  }
  function handleFromContent(e) {
    setFormContent(e.target.value);
  }
  return (
    <>
      <main>
        <div className="toolbar">
          <button className="add_note" onClick={handleCreateNote}>
            Add Note
          </button>
        </div>
        <div className="grid_container">
          {notes.map((item) => {
            return <Note {...item} key={item.id} />;
          })}
        </div>

        <div className={isAddingNote ? "" : "hidden"}>
          <div className="add_note_form">
            <input
              placeholder="Title"
              className="editable_title_area"
              value={formTitle}
              onChange={(e) => handleFromTitle(e)}
            ></input>
            <textarea
              value={formContent}
              onChange={(e) => handleFromContent(e)}
              className="editable_content_area"
              placeholder="Take a note…"
            ></textarea>
            <button className="save_button" onClick={handleAddNote}>
              Save
            </button>
            <button className="cancel_button" onClick={handleClearForm}>
              Cancel
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
