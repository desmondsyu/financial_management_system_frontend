import BookList from "../../ui/menuitems/books/book-list";
import Button from "../../ui/button";
import Search from "../../ui/search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addBook } from "../../lib/actions";
import type { Labels } from "../../lib/definitions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { fetchBooks } from "../../lib/data";
import { getUserFromStorage } from "../../lib/currentuser";

export default function Page() {
    const [searchParams] = useSearchParams();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newBookName, setNewBookName] = useState<string>("");
    const [books, setBooks] = useState<Labels[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const initialBooks = await fetchBooks();
                setBooks(initialBooks);
            } catch (error) {
                console.error(error);
            }
        };
        loadBooks();
    }, []);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCreate = async () => {
        try {
            setLoading(true);
            await addBook(newBookName, getUserFromStorage());

            const newBook: Labels = {
                id: 0,
                name: newBookName,
            }
            
            setBooks([newBook, ...books]);
            setNewBookName("");
            setIsCreating(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewBookName("");
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-row justify-between items-center w-4/5">
                <div className="basis-3/4">
                    <Search placeholder="Search books..." />
                </div>
                <div className="basis-1/4">
                    <Button label="Create" disabled={isCreating} onClick={handleCreateClick} />
                </div>
            </div>
            {isCreating && (
                <div className="flex w-3/4 p-4 bg-white border border-gray-200 rounded shadow-sm">
                    <input
                        type="text"
                        value={newBookName}
                        onChange={(e) => setNewBookName(e.target.value)}
                        placeholder="Enter book name"
                        className="border border-gray-300 px-2 py-1 rounded mb-2 w-full"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => handleCreate()}
                            className="text-green-500 hover:text-green-700"
                        >
                            <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="text-red-500 hover:text-red-700"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            <div className="w-3/4">
                <BookList searchTerm={searchParams.get("query") || ""} books={books} />
            </div>
        </div>
    );
}