import React, { useState, useEffect, createContext } from "react";
import { Form } from './components/Form/Form';
import './App.css';
import { ListNotes } from "./components/ListNotes/ListNotes";

export const context = createContext();

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  console.log(notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <context.Provider value={{ notesWrapper: notes }}>
        <div>
          <ListNotes
            notes={notes}
            setNotes={setNotes}
          />

          <Form
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      </context.Provider>
    </div>
  );
}

export default App;
