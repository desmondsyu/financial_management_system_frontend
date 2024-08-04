import { useState, useEffect } from "react";
import { fetchCategories } from "../../../lib/data";
import type { Category, FetchError } from "../../../lib/definitions";


export default function CategoryList() {
    const [data, setData] = useState<Category[] | null>(null);
    const [error, setError] = useState<FetchError | null>(null);

    useEffect(() => {
        fetchCategories()
            .then(setData)
            .catch(setError);
    }, []);

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (!data) {
        return <>Loading...</>;
    }

    return (
        <ul>
            {data.map((category) => (
                <li key={category.id}>{category.name}</li>
            ))}
        </ul>
    );
}