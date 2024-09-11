import { useState, useEffect } from "react";
import type { Labels, FetchError } from "../../../lib/definitions";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { editBook, deleteBook } from "../../../lib/actions";

interface BookListProps {
    searchTerm: string,
    books: Labels[],
}

export default function BookList({ searchTerm, books }: BookListProps) {
    const [data, setData] = useState<Labels[] | null>(books);
    const [filteredData, setFilteredData] = useState<Labels[] | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newName, setNewName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setData(books);
    }, [books]);

    useEffect(() => {
        if (data) {
            const filtered = data.filter((book) =>
                book.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);

    const handleEditClick = (id: number, name: string) => {
        setIsEditing(id);
        setNewName(name);
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await deleteBook(id);
            if (data) {
                setData(data.filter((book) => book.id !== id));
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (id: number) => {
        try {
            setLoading(true);
            const updatedBook = await editBook(id, newName);
            if (data) {
                const updatedData = data.map((book) => (book.id === id ? updatedBook : book));
                setData(updatedData);
                setFilteredData(updatedData);
            }
            setIsEditing(null);
            setNewName('');
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(null);
        setNewName("");
    };

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (!filteredData) {
        return <>Loading...</>;
    }

    return (
        <div className="w-full p-2">
            {loading && <p className="text-gray-600">Processing...</p>}
            {filteredData.length === 0 ? (
                <p className="text-gray-600">No matching results.</p>
            ) : (
                <ul className="space-y-2">
                    {filteredData.map((book) => (
                        <li key={book.id} className="justify-between p-2 bg-white border border-gray-200 rounded shadow-sm">
                            {isEditing === book.id ? (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="flex-grow border border-gray-300 px-2 py-1 rounded"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleSave(book.id)}
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
                                </>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className="flex-grow text-gray-800">{book.name}</span>
                                    <button
                                        onClick={() => handleEditClick(book.id, book.name)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}