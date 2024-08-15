import { createNote } from "@/actions/fetchNotes";
import { NotesContext } from "@/context/NoteCardContext";
import { Plus } from "lucide-react";
import React from "react";
import { useRef } from "react";
import { useContext } from "react";


const AddButton = () => {
    const { setNotes } = useContext(NotesContext);
    const startingPos = useRef(10);

    const addNote = async () => {
        const payload = {
            title: "Set a title!",
            content: "",
            color: "WHITE",
            position: {
                x: startingPos.current,
                y: startingPos.current
            },
            tags: []
        }
        startingPos.current += 10;
        const response = await createNote(payload);
        console.log(response)
        setNotes((prevState: any) => [...prevState, response]);
    };

    return (
        <div id="add-btn" onClick={addNote} className="flex justify-center items-center h-10 w-10  rounded-lg cursor-pointer transition duration-300 hover:border-2 hover:border-white">
            <Plus color="white" strokeWidth={4}/>
        </div>
    );
};

export default AddButton;