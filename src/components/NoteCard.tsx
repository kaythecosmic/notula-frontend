"use client"
import { TargetIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { TbTrashX } from "react-icons/tb";



const NoteCard = ({
    id,
    title,
    content,
    dateTime,
    color,
    tags,
}: {
    id: number;
    title: string;
    content: string;
    dateTime?: Date;
    color?: string;
    tags: string[];
}) => {


    return (
        <div key={id} className="m-5 p-2 shadow-notesHover w-[20rem] rounded-md bg-white bg-opacity-90">
            <div className="w-full h-8 rounded-md flex items-center justify-between border-b">
                <span className="font-bold text-md">
                    {title}
                </span>
                <div>
                    <TbTrashX size={15} className="mr-2 cursor-pointer" />
                </div>
            </div>
            <div className="w-full h-8 flex items-center justify-between">
                <div>
                    {tags.length > 0 &&
                        <div className="flex flex-wrap mt-2 gap-2 justify-start text-[0.7rem]">
                            <span className='pt-0.5 flex items-center justify-center'><TargetIcon className='h-4 flex items-center justify-center' /></span>
                            {tags.map((tag) => (
                                <span id={tag}
                                    key={tag}
                                    className={`py-px px-2 align-middle rounded-full border text-black font-bold`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div className="font-normal text-sm mt-1 py-2 h-[calc(100%-4.4rem)]">
                {content}
            </div>
        </div>
    )
}

export default NoteCard
