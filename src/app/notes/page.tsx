"use client"

import { fetchNotes } from '@/actions/fetchNotes';
import NoteCard from '@/components/NoteCard'
import Loader from '@/components/ui/spinner';
import { useEffect, useState } from 'react'

const Notes = () => {


    const [notes, setNotes] = useState<TypeNote[]>([]);

    useEffect(() => {
        async function loadBlogs() {
            const allNotes = await fetchNotes();
            setNotes(allNotes);
        }
        loadBlogs();
    }, []);

    if (notes.length == 0) {
        return (
            <div className='w-screen h-screen m-auto'>
                <Loader />
            </div>
        );
    }

    return (
        <div className='flex flex-wrap'>
            {
                notes.length != 0 && notes.map((note) => (
                    <div>
                        <NoteCard id={note.id} title={note.title} content={note.content} tags={note.tags} />
                    </div>
                ))
            }
        </div>
    )
}

export default Notes
