import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState, useEffect } from "react";
import { getReport, ReportProp } from "../../../lib/data";
import { Labels, Category } from "../../../lib/definitions";
import { transactionTypeData } from "../../../lib/data";
import { fetchBooks, fetchCategories } from "../../../lib/data";


export default function Page() {
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const typeList = transactionTypeData;
    const [error, setError] = useState<string | null>(null);

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

    const [formData, setFormData] = useState<ReportProp>(
        {
            from: null,
            to: null,
            label: null,
            type: null,
            group: null,
        }
    );

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const pdf = await getReport(formData);
            const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));

            const link = document.createElement("a");
            link.href = url;
            link.download = "report.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error fetching the report:", error);
            setError("Generating report failed")
        }
    }

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-96 flex flex-col justify-center contents-center">
                <form
                    onSubmit={onSubmit}>
                    <Textfield
                        type="date"
                        label="Date From"
                        disabled={false}
                        required={false}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                from: e.target.value ? new Date(e.target.value).toISOString() : null,
                            }))
                        }}
                    />

                    <Textfield
                        type="date"
                        label="Date To"
                        disabled={false}
                        required={false}
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                to: e.target.value ? new Date(e.target.value).toISOString() : null,
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
                                setFormData((prevData) => ({
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
                                setFormData((prevData) => ({
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
                                <option disabled>No category available</option>
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
                                setFormData((prevData) => ({
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
                        <Button label="Generate report" disabled={false} />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    );
}