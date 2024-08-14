"use client"
import { NotesContext } from "@/context/NoteCardContext"
import { autoGrow, setZIndex, setNewOffset, getOffset } from "@/lib/utils"
import { Tags } from "lucide-react"
import { useRef, useContext, useState, useEffect } from "react"
import { TbTrashX } from "react-icons/tb"
import DeleteButton from "./ui/DeleteButton"


const NoteCard = ({
    note
}: {
    note: TypeNote
}) => {

    let mouseStartPos = { x: 0, y: 0 }
    let initialCardPos = { x: 0, y: 0 }
    const cardRef = useRef(null)
    const { setSelectedNote } = useContext(NotesContext)
    const [saving, setSaving] = useState(false)
    const keyUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [position, setPosition] = useState({ x: 34, y: 258 })
    // const colors = JSON.parse(note.colors)
    // const body = bodyParser(note.body)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        // autoGrow(textAreaRef)
        if (cardRef.current) {
            setZIndex(cardRef.current)
        }
    }, [])

    const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement
        if (target.id === "cardheader") {
            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY
            initialCardPos = { x: position.x, y: position.y }

            if (cardRef.current) {
                setZIndex(cardRef.current)
            }
            document.addEventListener("mousemove", handleOnMouseMove)
            document.addEventListener("mouseup", handleOnMouseUp)
        }
    }

    const handleOnMouseMove = (e: MouseEvent) => {
        const currentMousePos = {
            x: e.clientX,
            y: e.clientY,
        }
        const mouseMoveDir = {
            x: currentMousePos.x - mouseStartPos.x,
            y: currentMousePos.y - mouseStartPos.y,
        }

        const newPosition = setNewOffset(initialCardPos, mouseMoveDir)
        setPosition(newPosition)
    }

    const handleOnMouseUp = () => {
        document.removeEventListener("mousemove", handleOnMouseMove)
        document.removeEventListener("mouseup", handleOnMouseUp)
        if (cardRef.current) {
            const newPosition = getOffset(cardRef.current);
            console.log(newPosition);
        }

    }

    const savePositionToDatabase = async (key: any, value: any) => {
        const payload = { [key]: JSON.stringify(value) }
        console.log("Save data called:", payload)
        try {
            // await db.notes.update(note.$id, payload)
        } catch (error) {
            console.error(error)
        }
        setSaving(false)
    }


    const handleKeyUp = async () => {
        setSaving(true)
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }
        if (keyUpTimer.current) {
            keyUpTimer.current = setTimeout(() => {
                if (textAreaRef.current && textAreaRef.current.value) {
                    // savePositionToDatabase("body", textAreaRef.current.value)
                }
            }, 2000)
        }
    }


    return (
        <div
            key={note.id}
            ref={cardRef}
            className="card m-5 p-2 shadow-notesHover w-[20rem] rounded-md bg-white bg-opacity-90"
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                // backgroundColor: colors.colorBody,
                zIndex: 1,
            }}
        >
            <div
                className="border border-black w-full h-8 rounded-md flex items-center justify-between border-b bg-gray-300 px-2 cursor-pointer active:bg-gray-400 transition-colors duration-300 ease-out"
                onMouseDown={handleOnMouseDown}
                id="cardheader"
            >
                <span className="font-bold text-md">
                    {note.title}
                </span>
                <div>
                    <DeleteButton noteID={note.id} />
                </div>
            </div>
            <div className="w-full h-8 flex items-center justify-between">
                <div>
                    {note.tags.length > 0 &&
                        <div className="flex flex-wrap mt-2 gap-2 justify-start text-[0.7rem]">
                            <span className='pt-0.5 flex items-center justify-center'>
                                <Tags className='h-4 flex items-center justify-center' />
                            </span>
                            {note.tags.map((tag) => (
                                <span id={tag}
                                    key={tag}
                                    className="px-1 flex items-center justify-center text-[8px] rounded-sm border border-black font-bold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className="font-normal text-sm mt-1 py-1 h-[calc(100%-4.4rem)]">
                {note.content}
            </div>
        </div>
    )
}

export default NoteCard
