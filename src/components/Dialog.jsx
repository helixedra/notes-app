import { useRef } from "react";

export default function Dialog({ children, dialog, cancel }) {
  const dialogRef = useRef();

  if (dialog) {
    dialogRef.current && dialogRef.current.showModal();
  } else {
    dialogRef.current && dialogRef.current.close();
  }

  const closeByBackdrop = (e) => {
    if (e && e.target === dialogRef.current) {
      cancel(); // toggling state at the top level
      dialogRef.current.close();
    }
  };

  return (
    <dialog ref={dialogRef} onClick={(e) => closeByBackdrop(e)}>
      <div className="popup_content">{children}</div>
    </dialog>
  );
}
