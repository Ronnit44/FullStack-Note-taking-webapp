import React, { useState } from "react";
import "../styles/Note.css";

function Note({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(note.id, editTitle, editContent);  
    setIsEditing(false);
  };

  return (
    <div className="note-container">
      {isEditing ? (
        <>
          <input
            className="note-title-edit"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="note-content-edit"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <strong className="note-title">{note.title}</strong>
          <p className="note-content">{note.content}</p>
          <p className="note-date">{formattedDate}</p>
          <div className="button-container">
            <button className="delete-button" onClick={() => onDelete(note.id)}>
              Delete
            </button>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
