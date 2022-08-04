import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useForm } from 'react-hook-form';
import { context } from "../../App";
import './Form.css';

export const Form = ({ notes, setNotes, noteId }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const { notesWrapper } = useContext(context);

  const initialNote = {
    id: uuidv4(),
    title: title,
    notes: [],
    isShowAddSubButton: false,
    isShowFuncButton: true,
  };

  const addNoteValue = () => {
    if (title.trim() !== "") {
      if (notesWrapper.length) {
        setNotes([...JSON.parse(JSON.stringify(notesWrapper)), initialNote]);
        setTitle("");
      } else {
        setNotes([initialNote]);
        setTitle("");
      }
    } else {
      setError(true)
    }
  };

  const addInnerNote = () => {
    if (title.trim() !== "") {
      const newNotes = [...JSON.parse(JSON.stringify(notesWrapper))];
      addSubNotes(newNotes);
      setNotes(newNotes);
    } else {
      setError("Please, enter note!");
    }
  };

  const addSubNotes = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteId) {
        note.isShowAddSubButton = false;
        note.notes = [
          ...note.notes,
          {
            id: uuidv4(),
            title: title,
            notes: [],
            isShowAddSubButton: false,
            isShowFuncButton: false,
          },
        ];
        setTitle("");
        return;
      }
      if (note.notes.length > 0) {
        addSubNotes(note.notes);
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        name="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Create a note"
        // {...register('text', {
        //   required: true,
        // })}
      />
      <button type="submit" onClick={noteId ? addInnerNote : addNoteValue}>
        Add
      </button>
      {error && <p style={{ color: "tomato" }}>{error}</p>}
    </form>
  );
};
