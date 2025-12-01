import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/Note.css";

// Color options for note tags
const COLOR_OPTIONS = [
  { value: 'default', label: 'Default', color: 'transparent' },
  { value: 'red', label: 'Red', color: '#ef4444' },
  { value: 'orange', label: 'Orange', color: '#f97316' },
  { value: 'yellow', label: 'Yellow', color: '#eab308' },
  { value: 'green', label: 'Green', color: '#22c55e' },
  { value: 'blue', label: 'Blue', color: '#3b82f6' },
  { value: 'purple', label: 'Purple', color: '#a855f7' },
];

// Quill editor configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
];

function Note({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color || 'default');

  // Format relative time
  const timeAgo = formatDistanceToNow(new Date(note.created_at), { addSuffix: true });

  // Get color for note tag
  const noteColor = COLOR_OPTIONS.find(c => c.value === note.color)?.color || 'transparent';

  // Strip HTML for truncation preview
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const plainText = stripHtml(note.content);
  const maxPreviewLength = 150;
  const shouldTruncate = plainText.length > maxPreviewLength && !isExpanded;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(note.id, editTitle, editContent, note.is_pinned, editColor);
    setIsEditing(false);
  };

  const handlePin = () => {
    onUpdate(note.id, note.title, note.content, !note.is_pinned, note.color);
  };

  return (
    <div className={`note-container ${note.is_pinned ? 'pinned' : ''}`}>
      {/* Color indicator */}
      {note.color && note.color !== 'default' && (
        <div className="note-color-indicator" style={{ backgroundColor: noteColor }} />
      )}

      {isEditing ? (
        <>
          <input
            className="note-title-edit"
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Note title"
          />

          <div className="editor-container">
            <ReactQuill
              theme="snow"
              value={editContent}
              onChange={setEditContent}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Write your note..."
            />
          </div>

          {/* Color selector */}
          <div className="color-selector">
            <span className="color-label">Color:</span>
            {COLOR_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={`color-dot ${editColor === option.value ? 'selected' : ''}`}
                style={{ backgroundColor: option.value === 'default' ? '#475569' : option.color }}
                onClick={() => setEditColor(option.value)}
                title={option.label}
              />
            ))}
          </div>

          <div className="button-container">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="note-header">
            <strong className="note-title">{note.title}</strong>
            {note.is_pinned && <span className="pin-badge">Pinned</span>}
          </div>

          <div
            className={`note-content ${shouldTruncate ? 'truncated' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {shouldTruncate ? (
              <>
                <p>{plainText.substring(0, maxPreviewLength)}...</p>
                <span className="read-more">Click to read more</span>
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            )}
          </div>

          <p className="note-date">{timeAgo}</p>

          <div className="button-container">
            <button className="pin-button" onClick={handlePin}>
              {note.is_pinned ? 'Unpin' : 'Pin'}
            </button>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
