import { useState, useRef } from "react";
import classes from "./Note.module.scss";
import DOMPurify from "dompurify";

function Note({ title, content, category }) {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(content);
  const textareaRef = useRef();

  function handleEditMode() {
    if (!editMode) {
      setEditMode((prev) => !prev);
    }
  }

  function handleSave() {
    console.log("saved");
    setEditMode((prev) => !prev);
  }

  function handleCancel() {
    console.log("canceled");
    setEditMode((prev) => !prev);
  }
  function handleContent(e) {
    setText(e.target.value);
  }

  function getSelectedText() {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    // console.log("Selected Text:", selectedText);
    return { textarea: textarea.value, start, end, selectedText };
  }

  function handleEditBold() {
    const { textarea, start, end, selectedText } = getSelectedText();
    const newString = replaceSubstring(
      textarea,
      start,
      end,
      `<b>${selectedText}</b>`
    );
    setText(newString);
  }

  function replaceSubstring(original, start, end, replacement) {
    if (start < 0 || end > original.length || start >= end) {
      throw new Error("Invalid start or end indices");
    }
    console.log(original);

    // Extract parts of the string
    const before = original.slice(0, start);
    const after = original.slice(end);
    // Concatenate with the replacement
    return before + replacement + after;
  }

  return (
    <div className={classes.note_container} onClick={handleEditMode}>
      {/* <div>{id}</div> */}
      <div>cat: {category}</div>
      <div className={classes.title}>{title}</div>
      {editMode ? (
        <textarea
          ref={textareaRef}
          className={classes.edit_area}
          value={text}
          onChange={handleContent}
        ></textarea>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        ></div>
      )}

      <div className={editMode ? `controls` : `controls hidden`}>
        <button onClick={handleEditBold}>Bold</button>
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Note;
