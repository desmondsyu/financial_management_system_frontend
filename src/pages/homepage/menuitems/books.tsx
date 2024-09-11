import BookList from "../../../ui/menuitems/books/book-list";
import Search from "../../../ui/search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addBook } from "../../../lib/actions";
import type { Labels } from "../../../lib/definitions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { fetchBooks } from "../../../lib/data";
import { getUserFromStorage } from "../../../lib/currentuser";

export default function Page() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newBookName, setNewBookName] = useState<string>("");
    const [books, setBooks] = useState<Labels[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const initialBooks = await fetchBooks();
                setBooks(initialBooks);
            } catch (error) {
                console.error(error);
                window.alert("Unable to load book list");
            }
        };
        loadBooks();

        if (searchParams.toString()) {
            setSearchParams({});
        }
    }, []);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCreate = async () => {
        try {
            await addBook(newBookName, getUserFromStorage());

            const newBook: Labels = {
                id: 0,
                name: newBookName,
                user: getUserFromStorage(),
            }

            setBooks([newBook, ...books]);
            setNewBookName("");
            setIsCreating(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewBookName("");
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex justify-center flex-col w-96">
                <div className="flex flex-row justify-between items-center">
                    <div className="w-72">
                        <Search placeholder="Search books..." />
                    </div>
                    <div className="w-24 pl-5">
                        <button
                            className="w-full leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            disabled={isCreating}
                            onClick={handleCreateClick}
                        >
                            Create
                        </button>
                    </div>
                </div>
                {isCreating && (
                    <div className="flex w-full mt-5 px-2 py-1 bg-white border border-gray-200 rounded shadow-sm">
                        <input
                            type="text"
                            value={newBookName}
                            onChange={(e) => setNewBookName(e.target.value)}
                            placeholder="Enter book name"
                            className="border border-gray-300 rounded w-full mr-2"
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
                <div className="w-full">
                    <BookList searchTerm={searchParams.get("query") || ""} books={books} />
                </div>
            </div>
        </div>
    );
}