import type { Labels, Category, TransactionType, Transaction } from "./definitions";
import axios from "axios";
import { getUserFromStorage } from "./currentuser";

export const transactionType: TransactionType[] = [
    {
        id: 1,
        name: "Income",
    },
    {
        id: 2,
        name: "Expense",
    },
]

export async function fetchBooks(): Promise<Labels[]> {
    try {
        const response = await axios.get("http://107.20.240.135:8088/labels",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );

        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await axios.get(`http://107.20.240.135:8088/transaction-groups?username=${getUserFromStorage()?.username}`,
            {
                headers: {
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
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
        const response = await axios.get(`http://107.20.240.135:8088/transactions?page=${page}&size=${size}&sort=${sort}`,
            {
                headers: {
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

