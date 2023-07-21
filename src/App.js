import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [severity, setSeverity] = useState('low');
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSeverityChange = (event) => {
    setSeverity(event.target.value);
  };

  const handleAddNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newNote = {
        id: Date.now(),
        title,
        content,
        severity,
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
      setSeverity('low');
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setSeverity(noteToEdit.severity);
      setEditMode(true);
      setEditNoteId(id);
    }
  };

  const handleUpdateNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editNoteId
        ? {
            ...note,
            title,
            content,
            severity,
          }
        : note
    );
    setNotes(updatedNotes);
    setEditMode(false);
    setEditNoteId(null);
    setTitle('');
    setContent('');
    setSeverity('low');
  };

  const handleCancel = () => {
    setEditMode(false)
    setTitle('');
    setContent('');
    setSeverity('low');
  };
  
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>React Notes App</h1>
      <div className="add-note-container">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
        />
        <select value={severity} onChange={handleSeverityChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {editMode ? (
          <>
            <button onClick={handleUpdateNote}>Update Note</button>
            <button  onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddNote}>Add Note</button>
        )}
      </div>
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className={`note-card ${note.severity}`}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div>
              <button onClick={() => handleEditNote(note.id)}>Edit</button>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
