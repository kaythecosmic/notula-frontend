import React from "react";
import { useContext } from "react";
import { NotesContext } from "@/context/NoteCardContext"
import { updateNote } from "@/actions/fetchNotes";

const Color = ({ color }: { color: { id: string, colorHeader: string, colorBody: string, colorText: string } }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const handleColorChange = async () => {
        try {
            const currentNoteIndex = notes.findIndex(
                (note: any) => note.id === selectedNote.id
            );
            const payload = {
                ...notes[currentNoteIndex],
                color: color.id,
            };
            const newNotes = [...notes];
            newNotes[currentNoteIndex] = payload;
            setNotes(newNotes);

            const response = await updateNote(notes[currentNoteIndex].id, payload);
        } catch (error) {
            console.log("A Note must be selected before changing color.");
        }
    };

    return (
        <div
            onClick={handleColorChange}
            className="h-10 w-10 rounded-lg border-white cursor-pointer transition duration-500 hover:border-4 ease-in-out"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;