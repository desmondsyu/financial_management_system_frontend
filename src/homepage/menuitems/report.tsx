import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState, useEffect } from "react";
import { getReport, ReportProp } from "../../lib/data";
import { Labels, Category } from "../../lib/definitions";
import { transactionTypeData } from "../../lib/data";
import { fetchBooks, fetchCategories } from "../../lib/data";


export default function Page() {
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

    const [formData, setFormData] = useState<ReportProp>(
        {
            from: null,
            to: null,
            label: null,
            type: null,
            group: null,
        }
    );
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataWithISODate = {
            ...formData,
            from: formData.from ? new Date(formData.from).toISOString() : null,
            to: formData.to ? new Date(formData.to).toISOString() : null,
        };

        try {
            const pdf = await getReport(formDataWithISODate);
            const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
            setPdfUrl(url);
        } catch (error) {
            console.error("Error fetching the report:", error);
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <Textfield
                        type="date"
                        label="Date From"
                        disabled={false}
                        required={false}
                        onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    />
                    <Textfield
                        type="date"
                        label="Date To"
                        disabled={false}
                        required={false}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })} />
                    <div>
                        <label>Type</label>
                        <select
                            onChange={(e) => setFormData({ ...formData, type: e.target.value ? Number(e.target.value) : null })}
                        >
                            <option defaultChecked>Select type</option>
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
                            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                        >
                            <option defaultChecked>Select category</option>
                            {categoryList ? categoryList.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            )) : (
                                <option disabled>No books available</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label>Books</label>
                        <select
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                        >
                            <option defaultChecked>Select category</option>
                            {booksList ? booksList.map((book) => (
                                <option key={book.id}>
                                    {book.name}
                                </option>
                            )) : (
                                <option disabled>No books available</option>
                            )}
                        </select>
                    </div>
                    <Button label="Download" disabled={false} />
                </form>
            </div>
            {pdfUrl && (
                <div>
                    <iframe src={pdfUrl} width="100%" height="600px"></iframe>
                    <a href={pdfUrl} download="report.pdf">Download PDF</a>
                </div>
            )}
        </div>
    );
}