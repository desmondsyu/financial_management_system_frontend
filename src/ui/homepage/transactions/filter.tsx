import Textfield from "../../textfield";
import Button from "../../button";
import { fetchBooks, fetchCategories } from "../../../lib/data";
import { transactionTypeData } from "../../../lib/data";
import { useState, useEffect } from "react";
import type { Labels, Category } from "../../../lib/definitions";

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
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const typeList = transactionTypeData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                setBooksList(books || []);
                const categories = await fetchCategories();
                setCategoryList(categories || []);
            } catch (error: any) {
                console.error(error);
                throw new Error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <form className="bg-neutral-200 rounded-lg">
                <Textfield
                    type="date"
                    label="Date from"
                    disabled={false}
                    required={false}
                    onChange={(e) => {
                        setFilterParams((prevData) => ({
                            ...prevData,
                            fromDate: new Date(e.target.value).toISOString(),
                        }))
                    }}
                />
                <Textfield
                    type="date"
                    label="Date to"
                    disabled={false}
                    required={false}
                    onChange={(e) => {
                        setFilterParams((prevData) => ({
                            ...prevData,
                            toDate: new Date(e.target.value).toISOString(),
                        }))
                    }}
                />

                <div className="p-2.5">
                    <label className="block mb-2 text-md font-medium text-gray-900">
                        Type
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => {
                            const value = e.target.value === "none" ? null : parseInt(e.target.value);
                            setFilterParams((prevData) => ({
                                ...prevData,
                                type: value,
                            }))
                        }}
                    >
                        <option defaultChecked value="none">Select type</option>
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
                        onChange={(e) => {
                            const value = e.target.value === "none" ? null : e.target.value;
                            setFilterParams((prevData) => ({
                                ...prevData,
                                group: value,
                            }))
                        }}
                    >
                        <option defaultChecked value="none">Select category</option>
                        {categoryList ? categoryList.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        )) : (
                            <option disabled>No books available</option>
                        )}
                    </select>
                </div>

                <div className="p-2.5">
                    <label className="block mb-2 text-md font-medium text-gray-900">
                        Books
                    </label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => {
                            const value = e.target.value === "none" ? null : e.target.value;
                            setFilterParams((prevData) => ({
                                ...prevData,
                                label: value,
                            }))
                        }}
                    >
                        <option defaultChecked value="none">Select book</option>
                        {booksList ? booksList.map((book) => (
                            <option key={book.id} value={book.name}>
                                {book.name}
                            </option>
                        )) : (
                            <option disabled>No books available</option>
                        )}
                    </select>
                </div>
                <div>
                    <Button type="clear" label="clear" disabled={false} />
                </div>
            </form>
        </>
    );
}