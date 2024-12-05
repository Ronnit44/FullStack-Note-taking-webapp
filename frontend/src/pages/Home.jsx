import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNote();
  }, []);

  const getNote = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNote();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNote();
      })
      .catch((err) => alert(err));
  };

  const updateNote = (id, updatedTitle, updatedContent) => {
    api
      .put(`/api/notes/update/${id}/`, {
        title: updatedTitle,
        content: updatedContent,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Note updated!");
          getNote();
        } else {
          alert("Failed to update note.");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="home-container">
      <div>
        <div className="logout-button-container">
          <Link to="/logout">
            <button>Logout</button>
          </Link>
        </div>

        <em>
          <h2>My Notes</h2>
        </em>

        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} onUpdate={updateNote} key={note.id} />
        ))}
      </div>

      <h2 className="create">Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
