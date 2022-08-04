import React, { useContext, useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { context } from "../../App";
import './ListNotes.css';

export const ListNotes = ({ notes, setNotes }) => {
  const [noteIdAdd, setNoteIdAdd] = useState("");
  const [noteIdRemove, setNoteIdRemove] = useState("");
  const { notesWrapper } = useContext(context);

  const notesMovedId = [...notesWrapper];

  const deleteNote = (id) => {
    const newNotes = notesWrapper.filter((item) => item.id !== id);
    setNotes(newNotes);
  };

  const findIndexNote = (id) => {
    for (let i = 0; i < notesWrapper.length; i++) {
      if (notesWrapper[i].id === id) {
        return i;
      }
    }
  };

  const moveNoteUp = (id) => {
    let indexOfId = findIndexNote(id);
    notesMovedId[indexOfId] = notesWrapper[indexOfId - 1];
    notesMovedId[indexOfId - 1] = notesWrapper[indexOfId];
    setNotes(notesMovedId);
  };

  const moveNoteDown = (id) => {
    let indexOfId = findIndexNote(id);
    notesMovedId[indexOfId] = notesWrapper[indexOfId + 1];
    notesMovedId[indexOfId + 1] = notesWrapper[indexOfId];
    setNotes(notesMovedId);
  };

  const showAddButton = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesWrapper))];
    toggleAddButton(newNotes);
    setNotes(newNotes);
  };

  const toggleAddButton = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteIdAdd) {
        note.isShowAddSubButton = !note.isShowAddSubButton;
      } else {
        note.isShowAddSubButton = false;
      }
      if (note.notes.length > 0) {
        toggleAddButton(note.notes);
      }
    }
  };

  useEffect(() => {
    if (noteIdAdd) {
      showAddButton(noteIdAdd);
      setNoteIdAdd("");
    }
  }, [noteIdAdd]);

  const removeSubList = () => {
    const newNotes = [...JSON.parse(JSON.stringify(notesWrapper))];
    chooseSubList(newNotes);
    setNotes(newNotes);
  };

  const chooseSubList = (listOfNotes) => {
    for (let note of listOfNotes) {
      if (note.id === noteIdRemove) {
        note.notes = [];
      }
      if (note.notes.length > 0) {
        chooseSubList(note.notes);
      }
    }
  };

  useEffect(() => {
    if (noteIdRemove) {
      removeSubList(noteIdRemove);
      setNoteIdRemove("");
    }
  }, [noteIdRemove]);

  return (
    <div className="section">
      {notes.map((note) => (
        <ul key={note.id} className="list">
          <li className="list__wrappers">
            <p className="list__title">{note.title}</p>
            <div className="list__button">
              {note.notes.length !== 0 ? (
                <button
                  className="button-removeSublist"
                  onClick={() => {
                    setNoteIdRemove(note.id);
                  }}
                >
                  Remove Sublist
                </button>
              ) : (
                <button
                  className="button-add"
                  onClick={() => {
                    setNoteIdAdd(note.id);
                  }}
                >
                  {note.isShowAddSubButton ? "Hide add form" : "Add Sublist"}
                </button>
              )}
            </div>
            {note.isShowFuncButton && (
              <div className="button-wrapper">
                <button
                  className="button-remove"
                  onClick={() => deleteNote(note.id)}
                >
                  Remove
                </button>
                {note !== notes[0] && (
                  <button
                    className="button-direction"
                    onClick={() => moveNoteUp(note.id)}
                  >
                    🔼
                  </button>
                )}
                {note !== notes[notesWrapper.length - 1] && (
                  <button
                    className="button-direction"
                    onClick={() => moveNoteDown(note.id)}
                  >
                    🔽
                  </button>
                )}
              </div>
            )}
          </li>
          <div className="inner-list">
            {note.notes.length > 0 && (
              <ListNotes setNotes={setNotes} notes={note.notes} />
            )}
            {note.isShowAddSubButton && (
              <Form setNotes={setNotes} noteId={note.id} />
            )}
          </div>
        </ul>
      ))}
    </div>
  );
};
