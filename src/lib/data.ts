import type { Labels, Category } from "./definitions";
import { curUserEmail, curUserPassword, curUserName } from "./currentuser";

export async function fetchBooks(): Promise<Labels[]> {
    try {
        const response = await fetch("/labels", {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Labels[] = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`/transaction-groups?username=${curUserName}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

