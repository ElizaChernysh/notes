import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  console.log(notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (note.trim() !== "") {
      const newnote = {
        id: uuidv4(),
        note: note,
      };

      setNotes((notes) => [...notes, newnote]);
      setNote("");
    } else {
      setError(true);
      setNote("");
    }
  };

  const deleteNote = (id) => {
    const newNotes = [...notes].filter((item) => item.id !== id)
    setNotes(newNotes);
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input
          name="user"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Create a note"
        />
        {error && <p style={{color: 'tomato'}}>Enter something</p>}
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((item, index) => {
          return (
            <>
            <li key={item.id}>{item.note}</li>
            <button 
              type="button"
              onClick={() => deleteNote(item.id)}
            >
              Delete
            </button>
            </>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
