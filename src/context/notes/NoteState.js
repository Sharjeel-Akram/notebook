import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "6553fa62c02aa67a374b97a5a",
          "user": "6553984ff53231805fe69529",
          "title": "This is First",
          "description": "I have to go on Sunday",
          "tag": "Personal",
          "date": "2023-11-14T22:53:22.052Z",
          "__v": 0
        },
        {
            "_id": "6553fa62c02aa6a374b97a775a",
            "user": "6553984ff53231805fe69529",
            "title": "This is First",
            "description": "I have to go on Sunday",
            "tag": "Personal",
            "date": "2023-11-14T22:53:22.052Z",
            "__v": 0
          }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
