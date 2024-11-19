import { useState, useEffect, useRef } from "react";
import classes from "./Note.module.scss";
import {
  RiBold,
  RiUnderline,
  RiItalic,
  RiH1,
  RiH2,
  RiListCheck,
  RiListOrdered,
} from "@remixicon/react";

import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

function Note({ title, content }) {
  const [editMode, setEditMode] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    content
      ? EditorState.createWithContent(ContentState.createFromText(content))
      : EditorState.createEmpty()
  );

  const editorRef = useRef(null);

  useEffect(() => {
    if (editMode && editorRef.current) {
      editorRef.current.focus();
    }
  }, [editMode]);

  const currentInlineStyle = editorState.getCurrentInlineStyle();

  // Обробка inline-стилів
  function handleInlineStyle(style) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }

  // Обробка блочних стилів
  function handleBlockStyle(style) {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  }

  function handleEditMode() {
    if (!editMode) {
      setEditMode(true);
    }
  }

  function handleSave(e) {
    e.stopPropagation();

    const rawContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    console.log("saved content:", rawContent);

    setEditMode(false);
  }

  function handleCancel(e) {
    e.stopPropagation();
    console.log("canceled");
    setEditMode(false);
  }

  // Масив для кнопок inline-стилів
  const inlineStyles = [
    { icon: <RiBold />, label: "Bold", style: "BOLD" },
    { icon: <RiItalic />, label: "Italic", style: "ITALIC" },
    { icon: <RiUnderline />, label: "Underline", style: "UNDERLINE" },
  ];

  // Масив для кнопок блочних стилів
  const blockStyles = [
    { icon: <RiH1 />, label: "H1", style: "header-one" },
    { icon: <RiH2 />, label: "H2", style: "header-two" },
    {
      icon: <RiListCheck />,
      label: "Bullet List",
      style: "unordered-list-item",
    },
    {
      icon: <RiListOrdered />,
      label: "Numbered List",
      style: "ordered-list-item",
    },
  ];

  return (
    <div className={classes.note_container} onClick={handleEditMode}>
      <div className={classes.title}>{title}</div>

      {editMode && (
        <div className={classes.toolbar}>
          {/* Кнопки inline-стилів */}
          {inlineStyles.map((button) => (
            <button
              key={button.style}
              className={currentInlineStyle.has(button.style) ? "active" : ""}
              onClick={() => handleInlineStyle(button.style)}
              title={button.label}
            >
              {button.icon}
            </button>
          ))}
          {/* Кнопки блочних стилів */}
          {blockStyles.map((button) => (
            <button
              key={button.style}
              onClick={() => handleBlockStyle(button.style)}
              title={button.label}
            >
              {button.icon}
            </button>
          ))}
        </div>
      )}

      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={setEditorState}
      />

      {editMode && (
        <div className={classes.controls}>
          <button onClick={handleSave}>Save</button>
          <button className={classes.cancel} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
