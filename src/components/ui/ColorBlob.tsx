import React from "react";
import { useContext } from "react";
import { NotesContext } from "@/context/NoteCardContext"

const Color = ({ color }: { color: any }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const handleColorChange = () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note: any) => note.id === selectedNote.$id
            );
            const payload = {
                ...notes[currentNoteIndex],
                colors: JSON.stringify(color),
            };
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = payload;
            setNotes(newNotes);
        } catch (error) {
            alert("A Note must be selected before changing color.");
        }
    };

    return (
        <div
            onClick={handleColorChange}
            className={`h-10 w-10 rounded-lg border-white cursor-pointer transition duration-500 hover:border-4 ease-in-out`}
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;