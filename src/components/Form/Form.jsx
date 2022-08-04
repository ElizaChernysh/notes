import React, {useState} from 'react';
import { v4 as uuidv4 } from "uuid";

export const Form = ({notes, setNotes}) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (note.trim() !== "") {
      const newNote = {
        id: uuidv4(),
        note: note,
      };

      setNotes((notes) => [...notes, newNote]);
      setError(false);
      setNote("");
    } else {
      setError(true);
      setNote("");
    }
  };

  return (
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
  )
}
