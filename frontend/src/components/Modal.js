import React from "react";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h4 className="modalTitle">{props.title}</h4>
        </div>
        <div className="modalBody">{props.children}</div>
        <div className="modalFooter">
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
