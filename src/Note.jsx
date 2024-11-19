import { useState, useRef } from "react";
import { RiDeleteBin6Fill } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, changeNote } from "./store/notesSlice.js";
import classes from "./Note.module.scss";

function Note({ id }) {
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === id)
  );

  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const contentRef = useRef();
  const titleRef = useRef();

  function handleEditMode() {
    if (!editMode) {
      setEditMode((prev) => !prev);
    }
  }

  function handleSave() {
    const newState = {
      title: titleRef.current.textContent,
      content: contentRef.current.textContent,
    };

    dispatch(changeNote({ id, ...newState }));
    setEditMode(false);
  }

  function handleCancel() {
    if (titleRef.current) titleRef.current.textContent = note.title;
    if (contentRef.current) contentRef.current.textContent = note.content;

    setEditMode(false);
  }

  return (
    <div className={classes.note_container} onClick={handleEditMode}>
      <div className={classes.note_header}>
        {editMode ? (
          <div
            ref={titleRef}
            className={classes.title}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {note.title}
          </div>
        ) : (
          <div className={classes.title}>{note.title}</div>
        )}
        <button
          className={classes.delete_note}
          onClick={() => dispatch(deleteNote(id))}
        >
          <RiDeleteBin6Fill />
        </button>
      </div>

      {editMode ? (
        <div
          ref={contentRef}
          className={classes.content}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {note.content}
        </div>
      ) : (
        <div>{note.content}</div>
      )}

      <div
        className={editMode ? classes.controls : `${classes.controls} hidden`}
      >
        <button onClick={handleSave}>Save</button>
        <button className={classes.cancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Note;
