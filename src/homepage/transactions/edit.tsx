import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState, useEffect } from "react";
import { transactionTypeData } from "../../lib/data";
import { fetchBooks, fetchCategories } from "../../lib/data";
import type { Labels, Category } from "../../lib/definitions";
import { useLocation, useNavigate } from "react-router-dom";
import { TransactionProp } from "../../lib/actions";
import { getUserFromStorage } from "../../lib/currentuser";
import { editTransaction } from "../../lib/actions";
import { formatDate } from "../../lib/utils";

export default function Page() {
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const typeList = transactionTypeData;
    const navigate = useNavigate();
    const location = useLocation();
    const transaction = location.state?.transaction as TransactionProp;
    const [simbol, setSimbol] = useState<number>();
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
        type: transaction?.transactionGroup?.transactionType || null,
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
        <div>
            <form onSubmit={handleCreate}>
                <div>
                    <label>Type</label>
                    <select
                        value={formData.transactionGroup?.transactionType.id || ""}
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
                        <option disabled value="">Select type</option>
                        {typeList.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Category</label>
                    <select
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
                    min={0}
                    disabled={false}
                    required={true}
                    value={formData.amount.toString()}
                    onChange={(e) => {
                        if(simbol === 1){
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
                    value={formData.description || ""}
                    onChange={(e) => {
                        setFormData((formData) => ({
                            ...formData,
                            description: e.target.value,
                        }))
                    }}
                />

                <div>
                    <label>Books</label>
                    <select
                        value={formData.label?.id || ""}
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
    );
}