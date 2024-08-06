import type { Labels, Category, TransactionType, Transaction } from "./definitions";
import { testUser1 } from "./currentuser";

export const transactionType: TransactionType[] = [
    {
        id: 1,
        name: "Income",
    },
    {
        id: 2,
        name: "Outcome",
    },
]

export async function fetchBooks(): Promise<Labels[]> {
    try {
        const response = await fetch("/labels", {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Labels[] = await response.json();
        return data;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(`/transaction-groups?username=${testUser1.username}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        return data;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

interface TransactionListProp {
    page: number,
    size: number,
    sort: string[],
    fromDate?: string,
    toDate?: string,
    label?: string,
    type?: number,
    group?: string,
}

export async function fetchTransactions({
    page,
    size,
    sort,
    fromDate,
    toDate,
    label,
    type,
    group,
}: TransactionListProp): Promise<Transaction> {
    try {
        const response = await fetch(`/transactions?page=${page}&size=${size}&sort=${sort}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Transaction = await response.json();
        console.log(data);
        return data;
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

