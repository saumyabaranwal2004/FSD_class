import { useState, useEffect, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import NoteItem from "./components/NoteItem";
import "./App.css";

function NotesApp() {
  const { theme } = useContext(ThemeContext);

  const [input, setInput] = useState("");

  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.title = `Notes(${notes.length})`;
  }, [notes.length]);

  const addNote = (event) => {
    event.preventDefault();

    if (input.trim() === "") return;

    const newNote = {
      id: Date.now() + Math.random(),
      text: input.trim(),
    };

    setNotes((prev) => [...prev, newNote]);
    setInput("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className={`app ${theme}`}>
      <div className="notes-container">
        <header className="header">
          <h1>My Notes</h1>
          <ThemeToggle />
        </header>

        <form className="note-form" onSubmit={addNote}>
          <input
            type="text"
            placeholder="Write a note..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        <p>Total Notes: {notes.length}</p>

        {notes.length === 0 ? (
          <p className="empty-message">No notes yet</p>
        ) : (
          <ul className="notes-list">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  );
}

export default App;