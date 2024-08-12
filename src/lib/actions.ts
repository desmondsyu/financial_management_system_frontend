import type { Category, Labels, TransactionType, User } from "./definitions";
import axios from "axios";

export async function addBook(name: string, user: User): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/labels",
            {
                name: name,
                user: user,
            },
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function editBook(id: number, newName: string): Promise<Labels> {
    try {
        const response = await axios.put("http://107.20.240.135:8088/labels",
            {
                id: id,
                name: newName,
            },
            {
                headers: {
                    "Accept": "*/*",
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

export async function deleteBook(id: number): Promise<void> {
    try {
        const response = await axios.delete(`http://107.20.240.135:8088/labels/${id}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function addCategory(name: string, transactionType: TransactionType, user: User): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/transaction-groups",
            {
                name: name,
                transactionType: transactionType,
                user: user,
            },
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function editCategory(id: number, newName: string, newTransactionType: TransactionType | null, user: User): Promise<Category> {
    try {
        const response = await axios.put("http://107.20.240.135:8088/transaction-groups",
            {   
                id: id,
                name: newName,
                transactionType: newTransactionType,
                user: user,
            },
            {
                headers: {
                    "Accept": "*/*",
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

export async function deleteCategory(id: number): Promise<void> {
    try {
        const response = await axios.delete(`http://107.20.240.135:8088/transaction-groups/${id}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function getReport({
    from,
    to,
    label,
    type,
    group
}: {
    from?: string,
    to?: string,
    label?: string,
    type?: number,
    group?: string,
}): Promise<any> {
    try {
        const response = await axios.get(`http://107.20.240.135:8088/transactions/pdf?from=${from}&to=${to}&label=${label}}&type=${type}&group=${group}`,
            {
                headers: {
                    "Accept": "*/*",
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