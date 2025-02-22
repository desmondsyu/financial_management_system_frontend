import type { Labels, Category, TransactionType, TransactionPage, RecurringTransaction } from "./definitions";
import axios from "axios";
import { getUserFromStorage } from "./currentuser";
import { javaApi } from "./apidomains";

export const transactionTypeData: TransactionType[] = [
    {
        id: 1,
        name: "Income",
    },
    {
        id: 2,
        name: "Expense",
    },
];

export const feedbackTopics = [
    {
        id: 1,
        name: "Bug Report",
    },
    {
        id: 2,
        name: "Feature Request",
    },
    {
        id: 3,
        name: "General Inquiry",
    },
];

export const frequency = [
    {
        id: 1,
        name: "DAILY",
    },
    {
        id: 2,
        name: "WEEKLY",
    },
    {
        id: 3,
        name: "MONTHLY",
    },
    {
        id: 4,
        name: "YEARY",
    },
];

export async function fetchBooks(): Promise<Labels[]> {
    try {
        const response = await axios.get(`${javaApi}/labels`,
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
        const response = await axios.get(`${javaApi}/transaction-groups?username=${getUserFromStorage()?.username}`,
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

export interface TransactionListProp {
    page: number,
    size: number,
    sort: string[],
    fromDate: string | null,
    toDate: string | null,
    label: string | null,
    type: number | null,
    group: string | null,
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
}: TransactionListProp): Promise<TransactionPage> {
    try {
        const queryParams = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            sort: sort.join(','),
        });

        if (fromDate !== null) queryParams.append("from", fromDate);
        if (toDate !== null) queryParams.append("to", toDate);
        if (label !== null) queryParams.append("label", label);
        if (type !== null) queryParams.append("type", type.toString());
        if (group !== null) queryParams.append("group", group);

        const response = await axios.get(`${javaApi}/transactions?${queryParams.toString()}`,
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

export interface ReportProp {
    from: string | null,
    to: string | null,
    label: string | null,
    type: number | null,
    group: string | null,
}

export async function getReport({
    from,
    to,
    label,
    type,
    group
}: ReportProp): Promise<Blob> {
    try {
        const queryParams = new URLSearchParams();

        if (from !== null) queryParams.append("from", from);
        if (to !== null) queryParams.append("to", to);
        if (label !== null) queryParams.append("label", label);
        if (type !== null) queryParams.append("type", type.toString());
        if (group !== null) queryParams.append("group", group);

        const response = await axios.get(`${javaApi}/transactions/pdf?${queryParams.toString()}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
                responseType: "blob",
            },

        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function fetchRecurringRules(): Promise<RecurringTransaction[]> {
    try {
        const response = await axios.get(`${javaApi}/recurring-transactions`,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}