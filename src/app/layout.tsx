import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotesProvider from "@/context/NoteCardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Notula",
    description: "Note it up!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

            <body className={inter.className + " bg-neutral-800 relative"}>
                <NotesProvider>
                    {children}
                </NotesProvider>
            </body>
        </html>
    );
}
