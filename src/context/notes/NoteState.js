import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialState = {
        "name": "Sharjeel",
        "class": "4th Year"
    };

    const [state, setState] = useState(initialState);

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Akram",
                "class": "Completed"
            });
        }, 1000);
    };

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
