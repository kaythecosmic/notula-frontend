"use client"
import { fetchNotes } from "@/actions/fetchNotes";
import Loader from "@/components/ui/spinner";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const NotesContext = createContext<any>({});

const NotesProvider = (
    { children }:
        { children: any; }
) => {
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<TypeNote[]>([]);

    useEffect(() => {
        loadNotes();
    }, []);

    async function loadNotes() {
        const allNotes = await fetchNotes();
        setNotes(allNotes);
        setLoading(false);
    }

    const contextData = { notes, setNotes, selectedNote, setSelectedNote };

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div className='w-screen h-screen m-auto'>
                    <Loader />
                </div>
            ) : (
                children
            )}
        </NotesContext.Provider>
    );
};
export default NotesProvider;