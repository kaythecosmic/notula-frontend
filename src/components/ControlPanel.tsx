import React from "react";
import AddButton from "./ui/AddButton";
import { colors } from "@/lib/colors";
import Color from "./ui/ColorBlob";


const ControlPanel = () => {
    const convertColorSchemeToList = (colorScheme: Record<string, { id: string, colorHeader: string, colorBody: string, colorText: string }>) => {
        return Object.values(colorScheme);
    };

    // Usage example
    const colorSchemeList = convertColorSchemeToList(colors);
    return (
        <div id="controls" className="flex flex-col gap-4 items-center fixed left-4 top-1/2 transform -translate-y-1/2 bg-[#6b6d7c80] p-4 rounded-2xl">
            <AddButton />
            {colorSchemeList.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};

export default ControlPanel;