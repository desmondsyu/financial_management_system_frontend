import Textfield from "../../textfield";
import Button from "../../button";
import { fetchBooks, fetchCategories } from "../../../lib/data";
import { transactionTypeData } from "../../../lib/data";
import { useState, useEffect, useCallback } from "react";
import type { Labels, Category } from "../../../lib/definitions";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface FilterParams {
    fromDate: string | null;
    toDate: string | null;
    label: string | null;
    type: number | null;
    group: string | null;
}

interface FilterProps {
    filterParams: FilterParams;
    setFilterParams: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export default function Filter({ filterParams, setFilterParams }: FilterProps) {
    const [error, setError] = useState<string | null>(null);
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const typeList = transactionTypeData;
    const [isSearch, setIsSearch] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                setBooksList(books || []);
                const categories = await fetchCategories();
                setCategoryList(categories || []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = useCallback((field: keyof FilterParams, value: string | number | null) => {
        setFilterParams(prevData => ({
            ...prevData,
            [field]: value === "none" ? null : value
        }));
    }, [setFilterParams]);

    const handleDateChange = useCallback((field: 'fromDate' | 'toDate', value: string) => {
        setError(null);
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            setFilterParams(prevData => ({
                ...prevData,
                [field]: date.toISOString()
            }));
        } else {
            console.error('Invalid date:', value);
            setError("Invalid date");
        }
    }, [setFilterParams]);

    const handleClear = () => {
        setFilterParams({
            fromDate: null,
            toDate: null,
            label: null,
            type: null,
            group: null,
        });
    };

    return (
        <form className="bg-neutral-200 rounded-lg w-full sm:w-52 lg:w-72">
            <div>
                <div onClick={() => setIsSearch(!isSearch)} className="h-10 pl-2 py-2 flex sm:hidden">
                    <FunnelIcon />
                    <p className="px-2 font-bold">Search</p>
                </div>
                <div className="h-10 pl-2 py-2  hidden sm:flex">
                    <FunnelIcon />
                    <p className="px-2 font-bold">Search</p>
                </div>
            </div>
            {isSearch &&
                <div className="block sm:hidden">
                    <Textfield
                        type="date"
                        label="Date from"
                        disabled={false}
                        required={false}
                        onChange={(e) => handleDateChange('fromDate', e.target.value)}
                    />
                    <Textfield
                        type="date"
                        label="Date to"
                        disabled={false}
                        required={false}
                        onChange={(e) => handleDateChange('fromDate', e.target.value)}
                    />

                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Type
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => handleChange("type", parseInt(e.target.value))}
                        >
                            <option value="none">Select type</option>
                            {typeList.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Category
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => handleChange("group", e.target.value)}
                        >
                            <option value="none">Select category</option>
                            {categoryList.length ? categoryList.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            )) : (
                                <option disabled>No categories available</option>
                            )}
                        </select>
                    </div>

                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Books
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => handleChange("label", e.target.value)}
                        >
                            <option value="none">Select book</option>
                            {booksList.length ? booksList.map((book) => (
                                <option key={book.id} value={book.name}>
                                    {book.name}
                                </option>
                            )) : (
                                <option disabled>No books available</option>
                            )}
                        </select>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <Button type="button" label="Clear" onClick={handleClear} disabled={false} />
                    </div>
                </div>
            }
            <div className="hidden sm:block">
                <Textfield
                    type="date"
                    label="Date from"
                    disabled={false}
                    required={false}
                    onChange={(e) => handleDateChange('fromDate', e.target.value)}
                />
                <Textfield
                    type="date"
                    label="Date to"
                    disabled={false}
                    required={false}
                    onChange={(e) => handleDateChange('fromDate', e.target.value)}
                />

                <div className="p-2.5">
                    <label className="block mb-2 text-md font-medium text-gray-900">
                        Type
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => handleChange("type", parseInt(e.target.value))}
                    >
                        <option value="none">Select type</option>
                        {typeList.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="p-2.5">
                    <label className="block mb-2 text-md font-medium text-gray-900">
                        Category
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => handleChange("group", e.target.value)}
                    >
                        <option value="none">Select category</option>
                        {categoryList.length ? categoryList.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        )) : (
                            <option disabled>No categories available</option>
                        )}
                    </select>
                </div>

                <div className="p-2.5">
                    <label className="block mb-2 text-md font-medium text-gray-900">
                        Books
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => handleChange("label", e.target.value)}
                    >
                        <option value="none">Select book</option>
                        {booksList.length ? booksList.map((book) => (
                            <option key={book.id} value={book.name}>
                                {book.name}
                            </option>
                        )) : (
                            <option disabled>No books available</option>
                        )}
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                    <Button type="button" label="Clear" onClick={handleClear} disabled={false} />
                </div>
            </div>
        </form>
    );
}
