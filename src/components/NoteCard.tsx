"use client"
import { NotesContext } from "@/context/NoteCardContext"
import { autoGrow, setZIndex, setNewOffset, getOffset, cn } from "@/lib/utils"
import { useRef, useContext, useState, useEffect } from "react"
import DeleteButton from "./ui/DeleteButton"
import { Shantell_Sans } from "next/font/google";
import SavingLoader from "./ui/SavingLoader"
import { updateNote } from "@/actions/fetchNotes"
import { colors } from "@/lib/colors"
import { Notebook } from "lucide-react"


const shantell = Shantell_Sans({ weight: "500", subsets: ["latin"] });

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
    const [position, setPosition] = useState(note.position)

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        autoGrow(textAreaRef)
        if (cardRef.current) {
            setZIndex(cardRef.current)
        }
    }, [])

    const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setSaving(true)
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
            saveToDatabase("position", newPosition);
        }

    }

    const saveToDatabase = async (key: string, value: any) => {

        let payload = {} as TypeNote
        switch (key) {
            case "position":
                payload = { ...note, position: value }
                break;

            case "content":
                payload = { ...note, content: value }
                break;

            default:
                break;
        }
        console.log("Save data called:", payload)
        try {
            const response = await updateNote(note.id, payload);
        } catch (error) {
            console.error(error)
        }
        setSaving(false)
    }

    const handleKeyUp = async () => {
        setSaving(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
            keyUpTimer.current = null
        }
        if (keyUpTimer.current == null) {
            keyUpTimer.current = setTimeout(() => {
                if (textAreaRef.current && textAreaRef.current.value) {
                    console.log(textAreaRef.current.value);
                    saveToDatabase("content", textAreaRef.current.value)
                }
            }, 2000)
        }
    }

    return (
        <div
            key={note.id}
            ref={cardRef}
            className={cn("card shadow-notesHover w-[20rem] rounded-md bg-opacity-[98%]")}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: `${colors[note.color as keyof typeof colors].colorBody}`,
                zIndex: 1,
            }}
        >
            <div
                className="w-full h-7 rounded-md flex items-center gap-2 bg-gray-300 px-2 cursor-grab active:cursor-grabbing"
                style={{
                    backgroundColor: `${colors[note.color as keyof typeof colors].colorHeader}`,
                }}
            >
                <div className="w-full flex items-center justify-between" onMouseDown={handleOnMouseDown}
                    id="cardheader">
                    <Notebook size={14}/>
                    {saving && <SavingLoader />}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <DeleteButton noteID={note.id} />
                </div>
            </div>
            {/* <div className="w-full h-8 flex items-center justify-between">
                <div>

                    <div className="flex flex-wrap mt-2 gap-2 items-center justify-start text-[0.7rem]">
                        <span className='pt-0.5 flex items-center justify-center'>
                            <Tags className='h-4 flex items-center justify-center' />
                        </span>
                        {note.tags != null && note.tags.length > 0 ?
                            note.tags.map((tag) => (
                                <span id={tag}
                                    key={tag}
                                    className="px-1 flex items-center justify-center text-[8px] rounded-sm border border-black font-bold">
                                    {tag}
                                </span>
                            ))
                            : "untagged"
                        }
                    </div>
                </div>
            </div> */}
            <div className="font-normal text-sm mt-1 px-2 rounded-sm h-[calc(100%-4.4rem)]">
                <textarea
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        if (cardRef.current) {
                            setZIndex(cardRef.current);
                            setSelectedNote(note);
                        }
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    ref={textAreaRef}
                    className={cn(shantell.className, "bg-inherit w-full h-full resize-none text-sm focus:outline-none")}
                    style={{
                        color: `${colors[note.color as keyof typeof colors].colorText}`,
                    }}
                    defaultValue={note.content}
                ></textarea>
            </div>
        </div>
    )
}

export default NoteCard
