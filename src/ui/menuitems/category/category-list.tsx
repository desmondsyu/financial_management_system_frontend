import { useState, useEffect } from "react";
import { fetchCategories, transactionType } from "../../../lib/data";
import type { Category, FetchError, TransactionType } from "../../../lib/definitions";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { editCategory, deleteCategory } from "../../../lib/actions";
import { clsx } from "clsx";

interface CategoryListProps {
    searchTerm: string,
    categories: Category[],
}

export default function CategoryList({ searchTerm, categories }: CategoryListProps) {
    const [data, setData] = useState<Category[] | null>(categories);
    const [filteredData, setFilteredData] = useState<Category[] | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newType, setNewType] = useState<TransactionType>();
    const [newName, setNewName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setData(categories);
    }, [categories]);

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

    // const handleDelete = async (id: number) => {
    //     try {
    //         setLoading(true);
    //         await deleteCategory(id);
    //         if (data) {
    //             setData(data.filter((book) => book.id !== id));
    //         }
    //     } catch (error: any) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleSave = async (id: number) => {
    //     try {
    //         setLoading(true);
    //         const updatedBook = await editCategory(id, newName, newType);
    //         if (data) {
    //             const updatedData = data.map((book) => (book.id === id ? updatedBook : book));
    //             setData(updatedData);
    //             setFilteredData(updatedData);
    //         }
    //         setIsEditing(null);
    //         setNewName('');
    //     } catch (err: any) {
    //         setError(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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
        <div className="w-full p-4">
            {loading && <p className="text-gray-600">Processing...</p>}
            {filteredData.length === 0 ? (
                <p className="text-gray-600">No matching results.</p>
            ) : (
                <ul className="space-y-2">
                    {filteredData.map((category) => (
                        <li
                            key={category.id}
                            className="justify-between p-2 bg-white border border-gray-200 rounded shadow-sm"
                        >
                            {isEditing === category.id ? (
                                <>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex mr-5 ml-5">
                                            <input
                                                className="hidden"
                                                id="income"
                                                type="radio"
                                                value={transactionType[0].name}
                                                checked={newType === transactionType[0]}
                                                onChange={() => setNewType(transactionType[0])}
                                            />
                                            <label
                                                htmlFor="income"
                                                className={clsx(
                                                    "flex items-center justify-center px-2 py-1  rounded-s-full cursor-pointer",
                                                    {
                                                        "bg-cyan-500 text-white": newType === transactionType[0],
                                                        "bg-gray-300 text-black": newType !== transactionType[0],
                                                    }
                                                )}
                                            >
                                                Income
                                            </label>
                                            <input
                                                className="hidden"
                                                type="radio"
                                                id="expense"
                                                value={transactionType[1].name}
                                                checked={newType === transactionType[1]}
                                                onChange={() => setNewType(transactionType[1])}
                                            />
                                            <label
                                                htmlFor="expense"
                                                className={clsx(
                                                    "flex items-center justify-center px-2 py-1 rounded-e-full cursor-pointer",
                                                    {
                                                        "bg-orange-500 text-white": newType === transactionType[1],
                                                        "bg-gray-300 text-black": newType !== transactionType[1],
                                                    }
                                                )}
                                            >
                                                Expense
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="flex-grow border border-gray-300 px-2 py-1 rounded"
                                        />
                                        <button
                                            // onClick={() => handleSave(category.id)}
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
                                </>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <span className={clsx(
                                        "px-2 py-1 rounded-full text-white mr-5 ml-5",
                                        {
                                            "bg-cyan-500":
                                                category.transactionType.id === 1,
                                            "bg-orange-500":
                                                category.transactionType.id === 2,
                                        }
                                    )}>
                                        {category.transactionType.name}
                                    </span>
                                    <span className="flex-grow text-gray-800">
                                        {category.name}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleEditClick(category.id, category.name)
                                        }
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        // onClick={() => handleDelete(category.id)}
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
    )
}