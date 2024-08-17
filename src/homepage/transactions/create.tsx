import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionProp } from "../../lib/actions";
import { getUserFromStorage } from "../../lib/currentuser";
import type { Labels, Category } from "../../lib/definitions";
import { transactionTypeData } from "../../lib/data";
import { fetchBooks, fetchCategories } from "../../lib/data";
import { addTransaction } from "../../lib/actions";

export default function Page() {
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [simbol, setSimbol] = useState<number>();
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
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
    });

    const [type, setType] = useState<number>();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            await addTransaction(formData);
            navigate("/transactions");
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    return (
        <div className="w-full flex justify-center contents-center">
            <form 
            className="w-[40%]"
            onSubmit={handleCreate}
            >
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
                    min={0}
                    disabled={false}
                    required={true}
                    onChange={(e) => {
                        if (simbol === 1) {
                            setFormData((formData) => ({
                                ...formData,
                                amount: parseFloat(e.target.value),
                            }))
                        } else {
                            setFormData((formData) => ({
                                ...formData,
                                amount: - parseFloat(e.target.value),
                            }))
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
                    <Button label="Save" type="submit" disabled={false} />
                </div>
            </form>
        </div>
    );
}