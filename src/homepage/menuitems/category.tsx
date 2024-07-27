import Search from "../../ui/search";
import Item from "../../ui/menuitems/category/item";
import { useState, useEffect } from "react";
import { fetchCategories } from "../../lib/data";
import type { transaction_group } from "@prisma/client";

export default function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string,
    }
}) {
    const query = searchParams?.query || "";
    const [categories, setCategories] = useState<transaction_group[]>([]);
    useEffect(() => {
        async function fetchData() {
            const fetchedCategories  = await fetchCategories(query);
            setCategories(fetchedCategories);
        }
        fetchData();
    }, [query]);

    return (
        <>
            <div>
                <Search placeholder="Search category..." />
            </div>
            <div>
                <Item categories={categories} />
            </div>
        </>
    );
}