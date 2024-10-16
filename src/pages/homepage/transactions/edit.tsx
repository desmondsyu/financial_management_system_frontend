import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState, useEffect } from "react";
import { transactionTypeData } from "../../../lib/data";
import { fetchBooks, fetchCategories } from "../../../lib/data";
import type { Labels, Category } from "../../../lib/definitions";
import { useLocation, useNavigate } from "react-router-dom";
import { TransactionProp } from "../../../lib/actions";
import { getUserFromStorage } from "../../../lib/currentuser";
import { editTransaction } from "../../../lib/actions";
import { formatDate } from "../../../lib/utils";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function Page() {
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const typeList = transactionTypeData;
    const navigate = useNavigate();
    const location = useLocation();
    const transaction = location.state?.transaction as TransactionProp;
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

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

    const [formData, setFormData] = useState<TransactionProp>({
        id: transaction?.id,
        user: transaction?.user || getUserFromStorage(),
        hashcode: transaction?.hashcode,
        transactionGroup: transaction?.transactionGroup || null,
        label: transaction?.label || null,
        transactionDate: transaction?.transactionDate || "",
        amount: transaction?.amount || 0,
        description: transaction?.description || "",
        type: transaction?.type || null,
        balance: transaction?.balance || null,
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            await editTransaction(formData);
            navigate("/transactions");
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    return (
        <div className="w-full flex justify-center contents-center pb-12 md:pb-0">
            <div className="w-96">
                <div className="flex items-center mb-4">
                    <ArrowLeftCircleIcon
                        onClick={() => navigate(-1)}
                        className="mr-2 p-2 rounded-full hover:bg-gray-200 w-10 h-10"
                        aria-label="Go back" />
                    <h2 className="text-lg font-semibold text-gray-900">Back</h2>
                </div>
                <form onSubmit={handleCreate}>
                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Type
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.type?.id || ""}
                            onChange={(e) => {
                                const selectedType = typeList.find(type => type.id === parseInt(e.target.value));
                                if (selectedType) {
                                    setFormData((formData) => ({
                                        ...formData,
                                        type: selectedType,
                                    }));
                                    const filtered = categoryList.filter(category => category.transactionType.id === selectedType.id);
                                    setFilteredCategories(filtered);
                                    // setSimbol(selectedType.id);
                                } else {
                                    setFilteredCategories([]);
                                }
                            }}
                        >
                            <option disabled value="">Select type</option>
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
                            value={formData.transactionGroup?.id || ""}
                            onChange={(e) => {
                                const selectedCategory = categoryList.find(category => category.id === parseInt(e.target.value));
                                if (selectedCategory) {
                                    setFormData((formData) => ({
                                        ...formData,
                                        transactionGroup: selectedCategory,
                                    }));
                                }
                            }}
                        >
                            <option disabled value="">Select category</option>
                            {categoryList ? categoryList.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            )) : (
                                <option disabled>No books available</option>
                            )}
                        </select>
                    </div>

                    <Textfield
                        label="Date"
                        type="date"
                        disabled={false}
                        required={true}
                        value={formatDate(formData.transactionDate)}
                        onChange={(e) => {
                            setFormData((formData) => ({
                                ...formData,
                                transactionDate: new Date(e.target.value).toISOString(),
                            }))
                        }}
                    />

                    <Textfield
                        label="Amount"
                        type="number"
                        step={0.01}
                        disabled={false}
                        required={true}
                        value={Math.abs(formData.amount).toString()}
                        onChange={(e) => {
                            const value = Math.abs(parseFloat(e.target.value));

                            if (!isNaN(value)) {
                                const updatedAmount = formData.type?.id === 1 ? value : -value;
                                setFormData((formData) => ({
                                    ...formData,
                                    amount: updatedAmount,
                                }));
                            } else {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    amount: 0,
                                }));
                            }
                        }}
                    />

                    <Textfield
                        label="Description"
                        type="text"
                        disabled={false}
                        required={false}
                        value={formData.description || ""}
                        onChange={(e) => {
                            setFormData((formData) => ({
                                ...formData,
                                description: e.target.value,
                            }))
                        }}
                    />

                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Books
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={formData.label?.id || ""}
                            onChange={(e) => {
                                const selectedValue = e.target.value;

                                if (selectedValue === "") {
                                    setFormData((formData) => ({
                                        ...formData,
                                        label: null,
                                    }));
                                } else {
                                    const selectedBook = booksList.find(book => book.id === parseInt(selectedValue));
                                    if (selectedBook) {
                                        setFormData((formData) => ({
                                            ...formData,
                                            label: selectedBook,
                                        }));
                                    }
                                }
                            }}
                        >
                            <option value="">Select book</option>
                            {booksList ? booksList.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.name}
                                </option>
                            )) : (
                                <option disabled>No books available</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <Button label="Save" type="submit" disabled={false} />
                    </div>
                </form>
            </div>
        </div>
    );
}