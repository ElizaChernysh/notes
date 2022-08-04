import React from "react";

export const ListNotes = ({notes, setNotes}) => {

  const deleteNote = (id) => {
    const newNotes = [...notes].filter((item) => item.id !== id)
    setNotes(newNotes);
  };

  return (
    <div>
      {" "}
      <ul>
        {notes.map((item, index) => {
          return (
            <>
              <li key={item.id}>{item.note}</li>
              <button type="button" onClick={() => deleteNote(item.id)}>
                Delete
              </button>
            </>
          );
        })}
      </ul>
    </div>
  );
};

