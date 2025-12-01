import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

// Color options for new notes
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

function Home() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalSize, setModalSize] = useState("normal"); // "small" or "normal"
  const dropdownRef = useRef(null);

  useEffect(() => {
    getNote();
    getUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUser = () => {
    api
      .get("/api/user/me/")
      .then((res) => setUser(res.data))
      .catch((err) => console.log("Could not fetch user:", err));
  };

  const getNote = () => {
    setIsLoading(true);
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load notes");
        setIsLoading(false);
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Note deleted");
        } else {
          toast.error("Failed to delete note");
        }
        getNote();
      })
      .catch((error) => toast.error("Failed to delete note"));
  };

  const createNote = (e) => {
    e.preventDefault();

    // Validate content is not empty (Quill adds <p><br></p> for empty)
    const strippedContent = content.replace(/<(.|\n)*?>/g, '').trim();
    if (!strippedContent) {
      toast.error("Please add some content");
      return;
    }

    api
      .post("/api/notes/", { content, title, color, is_pinned: false })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Note created!");
          setTitle("");
          setContent("");
          setColor("default");
          setShowCreateModal(false);
        } else {
          toast.error("Failed to create note");
        }
        getNote();
      })
      .catch((err) => toast.error("Failed to create note"));
  };

  const updateNote = (id, updatedTitle, updatedContent, isPinned, noteColor) => {
    api
      .put(`/api/notes/update/${id}/`, {
        title: updatedTitle,
        content: updatedContent,
        is_pinned: isPinned,
        color: noteColor,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Note updated!");
          getNote();
        } else {
          toast.error("Failed to update note");
        }
      })
      .catch((err) => toast.error("Failed to update note"));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
      setFilteredNotes(filtered);
    }
  };

  // Get user's display name
  const getDisplayName = () => {
    if (!user) return "";
    if (user.first_name) {
      return user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name;
    }
    return user.username;
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <img src="/scribe-logo.png" alt="Scribe" className="header-logo" />
          <span className="header-title">Scribe</span>
        </div>

        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />

        {/* User Avatar Dropdown */}
        <div className="avatar-dropdown" ref={dropdownRef}>
          <button
            className="avatar-button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="User menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <span className="dropdown-name">{getDisplayName()}</span>
              </div>
              <div className="dropdown-divider" />
              <Link to="/logout" className="dropdown-item logout-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Notes Section */}
      <section className="notes-section">
        {isLoading ? (
          <div className="loading-notes">Loading notes...</div>
        ) : filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <Note
                note={note}
                onDelete={deleteNote}
                onUpdate={updateNote}
                key={note.id}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3>No results found</h3>
            <p>No notes match your search</p>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3>No notes yet</h3>
            <p>Create your first note to get started!</p>
          </div>
        )}
      </section>

      {/* Floating Create Button */}
      <button
        className="fab-create-button"
        onClick={() => setShowCreateModal(true)}
        aria-label="Create new note"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div
            className={`modal-content ${modalSize}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create a Note</h2>
              <div className="modal-controls">
                <button
                  className="size-toggle-button"
                  onClick={() => setModalSize(modalSize === "normal" ? "small" : "normal")}
                  title={modalSize === "normal" ? "Compact view" : "Expanded view"}
                >
                  {modalSize === "normal" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="4,14 10,14 10,20" />
                      <polyline points="20,10 14,10 14,4" />
                      <line x1="14" y1="10" x2="21" y2="3" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,3 21,3 21,9" />
                      <polyline points="9,21 3,21 3,15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  )}
                </button>
                <button
                  className="close-modal-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={createNote} className="create-form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Enter note title..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <div className="editor-container">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your note..."
                  />
                </div>
              </div>

              {/* Color selector for new notes */}
              <div className="form-group">
                <label>Color Tag</label>
                <div className="color-options">
                  {COLOR_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`color-dot ${color === option.value ? 'selected' : ''}`}
                      style={{ backgroundColor: option.value === 'default' ? '#475569' : option.color }}
                      onClick={() => setColor(option.value)}
                      title={option.label}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Create Note
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
