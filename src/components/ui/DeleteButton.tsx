import { deleteNote } from '@/actions/fetchNotes';
import { NotesContext } from '@/context/NoteCardContext';
import { Trash } from 'lucide-react'
import React, { useContext } from 'react'

const DeleteButton = ({ noteID }: { noteID: number }) => {
    const { setNotes } = useContext(NotesContext);

    const handleDelete = async () => {
        const response = deleteNote(noteID)
        setNotes((prevState: any) =>
            prevState.filter((note: any) => note.id !== noteID)
        );
    };
    return (

        <div>
            <Trash size={15} className="cursor-pointer" onClick={handleDelete} />
        </div>
    )
}

export default DeleteButton
