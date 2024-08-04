import { useState, useEffect } from "react";
import { fetchBooks } from "../../../lib/data";
import type { Labels, FetchError } from "../../../lib/definitions";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { EditBook, DeleteBook } from "../../../lib/actions";

interface BookListProps {
    searchTerm: string;
}

export default function BookList({ searchTerm }: BookListProps) {
    const [data, setData] = useState<Labels[] | null>(null);
    const [filteredData, setFilteredData] = useState<Labels[] | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newName, setNewName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchBooks()
            .then((fetchedData) => {
                setData(fetchedData);
                setFilteredData(fetchedData);
            })
            .catch(setError);
    }, []);

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
            await DeleteBook(id);
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
            const updatedBook = await EditBook(id, newName);
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
        <div>
            {loading && <p>Processing...</p>}
            {filteredData.length === 0 ? (
                <p>No matching results.</p>
            ) : (<ul>
                {filteredData.map((book) => (
                    <li key={book.id} className="flex items-center space-x-2">
                        {isEditing === book.id ? (
                            <>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="border px-2 py-1"
                                />
                                <button onClick={() => handleSave(book.id)} className="text-green-500">
                                    <CheckIcon className="h-5 w-5" />
                                </button>
                                <button onClick={handleCancel} className="text-red-500">
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{book.name}</span>
                                <button onClick={() => handleEditClick(book.id, book.name)} className="text-blue-500">
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button onClick={() => handleDelete(book.id)} className="text-red-500">
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>)}
        </div>
    );
}