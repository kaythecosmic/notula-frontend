"use client"
import ControlPanel from '@/components/ControlPanel';
import NoteCard from '@/components/NoteCard'
import NotesProvider, { NotesContext } from '@/context/NoteCardContext';
import { useContext } from 'react'


const Notes = () => {
    // const [notes, setNotes] = useState<TypeNote[]>([]);
    const { notes }: { notes: TypeNote[] } = useContext(NotesContext);
    return (
        <div className='flex flex-wrap'>
            {notes && notes.map((note: any) => (
                <NoteCard note={note} />
            ))}
            <ControlPanel />
        </div>
    )
}

export default Notes
