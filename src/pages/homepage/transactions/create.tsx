import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionProp, RecurringTransactionProp, addTransaction, addRecurringRule } from "../../../lib/actions";
import { getUserFromStorage } from "../../../lib/currentuser";
import type { Labels, Category } from "../../../lib/definitions";
import { transactionTypeData } from "../../../lib/data";
import { fetchBooks, fetchCategories, frequency } from "../../../lib/data";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

export default function Page() {
    const [recurChecked, setRecurChecked] = useState<boolean>(false);
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [simbol, setSimbol] = useState<number>();
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const typeList = transactionTypeData;
    const navigate = useNavigate();
    const [formData, setFormData] = useState<TransactionProp>({
        id: null,
        user: getUserFromStorage(),
        hashcode: null,
        transactionGroup: null,
        label: null,
        transactionDate: "",
        amount: 0,
        description: null,
        type: null,
        balance: 0,
    });

    const [recurFormData, setRecurFormData] = useState<RecurringTransactionProp>({
        id: null,
        transaction: formData,
        frequency: null,
        endDate: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                setBooksList(books || []);
                const categories = await fetchCategories();
                setCategoryList(categories || []);
            } catch (error: any) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!formData.type || !formData.transactionGroup) {
            alert("Please fill out all required fields.");
            return;
        }

        if (!recurChecked) {
            try {
                await addTransaction(formData);
                navigate("/transactions");
            } catch (error: any) {
                console.error(error);
                throw new Error(error.message);
            }
        } else {
            try {
                await addRecurringRule(recurFormData);
                navigate("/transactions");
            } catch (error: any) {
                console.error(error);
                throw new Error(error.message);
            }
        }
    }

    return (
        <div className="w-full flex justify-center contents-center">
            <div className="w-96">
                <div className="flex items-center mb-4">
                    <ArrowLeftCircleIcon
                        onClick={() => navigate(-1)}
                        className="mr-2 p-2 rounded-full hover:bg-gray-200 w-10 h-10"
                        aria-label="Go back"
                    />
                    <h2 className="text-lg font-semibold text-gray-900">Back</h2>
                </div>
                <form onSubmit={handleCreate}>
                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Type
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => {
                                const selectedType = typeList.find(type => type.id === parseInt(e.target.value));
                                if (selectedType) {
                                    setFormData((formData) => ({
                                        ...formData,
                                        type: selectedType,
                                    }));
                                    const filtered = categoryList.filter(category => category.transactionType.id === selectedType.id);
                                    setFilteredCategories(filtered);
                                    setSimbol(selectedType.id);
                                } else {
                                    setFilteredCategories([]);
                                }
                            }}
                            required={true}
                        >
                            <option disabled selected>Select type</option>
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
                                const selectedCategory = filteredCategories.find(category => category.id === parseInt(e.target.value));
                                if (selectedCategory) {
                                    setFormData((formData) => ({
                                        ...formData,
                                        transactionGroup: selectedCategory,
                                    }));
                                }
                            }}
                            required={true}
                        >
                            <option selected disabled>Select category</option>
                            {filteredCategories ? filteredCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            )) : (
                                <option disabled>No category available</option>
                            )}
                        </select>
                    </div>

                    <Textfield
                        label="Date"
                        type="date"
                        disabled={false}
                        required={true}
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
                        step={.01}
                        disabled={false}
                        required={true}
                        onChange={(e) => {
                            const value = Math.abs(parseFloat(e.target.value));

                            if (!isNaN(value)) {
                                const updatedAmount = simbol === 1 ? value : -value;
                                setFormData((formData) => ({
                                    ...formData,
                                    amount: updatedAmount,
                                }));
                            }
                        }}
                    />

                    <Textfield
                        label="Description"
                        type="text"
                        disabled={false}
                        required={false}
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
                            onChange={(e) => {
                                const selectedBook = booksList.find(book => book.id === parseInt(e.target.value));
                                if (selectedBook) {
                                    setFormData((formData) => ({
                                        ...formData,
                                        label: selectedBook,
                                    }));
                                }
                            }}
                        >
                            <option defaultChecked>Select book</option>
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
                        <input type="checkbox" onChange={() => setRecurChecked(!recurChecked)} />
                        <label>Recurring transaction</label>
                    </div>

                    {recurChecked &&
                        <>
                            <div className="p-2.5">
                                <label className="block mb-2 text-md font-medium text-gray-900">
                                    Frequency
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) => {

                                        setFormData((formData) => ({
                                            ...formData,
                                            frequency: e.target.value,
                                        }));

                                    }}
                                >
                                    {frequency.map((fre) => (
                                        <option key={fre.id} value={fre.name}>
                                            {fre.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Textfield
                                label="Till Date"
                                type="date"
                                disabled={false}
                                required={false}
                                onChange={(e) => {
                                    setRecurFormData((recurFormData) => ({
                                        ...recurFormData,
                                        endDate: new Date(e.target.value).toISOString(),
                                    }))
                                }}
                            />
                        </>
                    }

                    <div>
                        <Button label="Save" type="submit" disabled={false} />
                    </div>
                </form>
            </div>
        </div>
    );
}