import { RiDeleteBin6Fill } from "@remixicon/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "./store/notesSlice.js";
import classes from "./Note.module.scss";

function Note({ id, edit }) {
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === id)
  );

  const contentPreview = () => note.content.substring(0, 450) + "...";

  const dispatch = useDispatch();

  function handleDelete(event) {
    event.stopPropagation();
    dispatch(deleteNote(id));
  }

  return (
    <div className="masonry-item">
      <div className={classes.note_container} onClick={() => edit(id)}>
        <div className={classes.note_header}>
          <div className={classes.title}>{note.title}</div>

          <button className={classes.delete_note} onClick={handleDelete}>
            <RiDeleteBin6Fill />
          </button>
        </div>

        <div className={classes.note_content}>
          {note.content.length > 100 ? contentPreview() : note.content}
        </div>
      </div>
    </div>
  );
}

export default Note;
