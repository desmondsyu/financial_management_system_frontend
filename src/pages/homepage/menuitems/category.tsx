import CategoryList from "../../../ui/menuitems/category/category-list";
import Button from "../../../ui/button";
import Search from "../../../ui/search";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addCategory } from "../../../lib/actions";
import type { Category, TransactionType } from "../../../lib/definitions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { fetchCategories } from "../../../lib/data";
import { clsx } from "clsx";
import { transactionTypeData } from "../../../lib/data";
import { getUserFromStorage } from "../../../lib/currentuser";

export default function Page() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newCategoryType, setNewCategoryType] = useState<TransactionType>(transactionTypeData[0]);
    const [newCategoryName, setNewCategoryName] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const initialCategories = await fetchCategories();
                setCategories(initialCategories);
            } catch (error) {
                console.error(error);
                window.alert("Unable to load category list");
            }
        };
        loadCategories();

        if (searchParams.toString()) {
            setSearchParams({});
        }
    }, []);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleCreate = async () => {
        try {
            // setLoading(true);
            await addCategory(newCategoryName, newCategoryType, getUserFromStorage());

            const newCategory: Category = {
                id: 0,
                name: newCategoryName,
                transactionType: newCategoryType,
                user: getUserFromStorage(),
            }

            setCategories([newCategory, ...categories]);
            setNewCategoryName("");
            setNewCategoryType(transactionTypeData[0]);
            setIsCreating(false);
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsCreating(false);
        setNewCategoryName("");
        setNewCategoryType(transactionTypeData[0]);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-row justify-between items-center w-4/5">
                <div className="basis-3/4">
                    <Search placeholder="Search categories..." />
                </div>
                <div className="basis-1/4">
                    <Button label="Create" disabled={isCreating} onClick={handleCreateClick} />
                </div>
            </div>
            {isCreating && (
                <div className="flex items-center contents-center w-3/4 p-4 bg-white border border-gray-200 rounded shadow-sm">
                    <div className="flex mr-5 ml-5">
                        <input
                            className="hidden"
                            id="income"
                            type="radio"
                            value={transactionTypeData[0].name}
                            checked={newCategoryType === transactionTypeData[0]}
                            onChange={() => setNewCategoryType(transactionTypeData[0])}
                        />
                        <label
                            htmlFor="income"
                            className={clsx(
                                "flex items-center justify-center px-2 py-1  rounded-s-full cursor-pointer",
                                {
                                    "bg-cyan-500 text-white": newCategoryType === transactionTypeData[0],
                                    "bg-gray-300 text-black": newCategoryType !== transactionTypeData[0],
                                }
                            )}
                        >
                            Income
                        </label>
                        <input
                            className="hidden"
                            type="radio"
                            id="expense"
                            value={transactionTypeData[1].name}
                            checked={newCategoryType === transactionTypeData[1]}
                            onChange={() => setNewCategoryType(transactionTypeData[1])}
                        />
                        <label
                            htmlFor="expense"
                            className={clsx(
                                "flex items-center justify-center px-2 py-1 rounded-e-full cursor-pointer",
                                {
                                    "bg-orange-500 text-white": newCategoryType === transactionTypeData[1],
                                    "bg-gray-300 text-black": newCategoryType !== transactionTypeData[1],
                                }
                            )}
                        >
                            Expense
                        </label>
                    </div>
                    <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => { setNewCategoryName(e.target.value) }}
                        placeholder="Enter category name"
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
                <CategoryList searchTerm={searchParams.get("query") || ""} categories={categories} />
            </div>
        </div>
    );
}