import { useState, useEffect } from "react";
import { fetchCategories, transactionTypeData } from "../../../lib/data";
import type { Category, FetchError, TransactionType } from "../../../lib/definitions";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { editCategory, deleteCategory } from "../../../lib/actions";
import { clsx } from "clsx";
import { getUserFromStorage } from "../../../lib/currentuser";

interface CategoryListProps {
    searchTerm: string,
    categories: Category[],
}

export default function CategoryList({ searchTerm, categories }: CategoryListProps) {
    const [data, setData] = useState<Category[] | null>(categories);
    const [filteredData, setFilteredData] = useState<Category[] | null>(null);
    const [error, setError] = useState<FetchError | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newType, setNewType] = useState<TransactionType | null>(null);
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

    const handleEditClick = (id: number, name: string, transactionType: TransactionType) => {
        setIsEditing(id);
        setNewName(name);
        setNewType(transactionType)
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await deleteCategory(id);
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

            const updatedCategory = await editCategory(id, newName, newType, getUserFromStorage());
            if (data) {
                const updatedData = data.map((category) => (category.id === id ? updatedCategory : category));
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
        setNewType(null);
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
                    {filteredData.map((category) => (
                        <li
                            key={category.id}
                            className="justify-between p-2 bg-white border border-gray-200 rounded shadow-sm"
                        >
                            {isEditing === category.id ? (
                                <>
                                    <div className="flex justify-between items-center space-x-1">
                                        <div className="flex mr-1 ml-5">
                                            <input
                                                className="hidden"
                                                id="income"
                                                type="radio"
                                                value={category.transactionType.name}
                                                checked={newType === transactionTypeData[0]}
                                                onChange={() => setNewType(transactionTypeData[0])}
                                            />
                                            <label
                                                htmlFor="income"
                                                className={clsx(
                                                    "flex items-center justify-center px-2 py-1  rounded-s-full cursor-pointer",
                                                    {
                                                        "bg-cyan-500 text-white": newType?.id === transactionTypeData[0].id,
                                                        "bg-gray-300 text-black": newType?.id !== transactionTypeData[0].id,
                                                    }
                                                )}
                                            >
                                                Income
                                            </label>
                                            <input
                                                className="hidden"
                                                type="radio"
                                                id="expense"
                                                value={category.transactionType.name}
                                                checked={newType === transactionTypeData[1]}
                                                onChange={() => setNewType(transactionTypeData[1])}
                                            />
                                            <label
                                                htmlFor="expense"
                                                className={clsx(
                                                    "flex items-center justify-center px-2 py-1 rounded-e-full cursor-pointer",
                                                    {
                                                        "bg-orange-500 text-white": newType?.id === transactionTypeData[1].id,
                                                        "bg-gray-300 text-black": newType?.id !== transactionTypeData[1].id,
                                                    }
                                                )}
                                            >
                                                Expense
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="w-full border border-gray-300 px-1 py-1 rounded"
                                            />
                                        </div>
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => handleSave(category.id)}
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
                                            handleEditClick(category.id, category.name, category.transactionType)
                                        }
                                        className={clsx(
                                            "text-blue-500 hover:text-blue-700",
                                            {
                                                "hidden":
                                                    category.user === null,

                                            }
                                        )}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className={clsx("text-red-500 hover:text-red-700",
                                            {
                                                "hidden":
                                                    category.user === null,
                                            }
                                        )}
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