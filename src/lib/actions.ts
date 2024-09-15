import type { Category, Labels, TransactionType, User, Transaction, UploadResult } from "./definitions";
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

export interface TransactionProp {
    id: number | null,
    user: User,
    hashcode: string | null,
    transactionGroup: Category | null,
    label: Labels | null,
    transactionDate: string,
    amount: number,
    description: string | null,
    type: TransactionType | null,
    balance: number | null,
}

export async function addTransaction(transcation: TransactionProp): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/transactions",
            transcation,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
                "responseType": "blob",
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function editTransaction(transaction: TransactionProp): Promise<Transaction | null> {
    try {
        const response = await axios.put("http://107.20.240.135:8088/transactions",
            transaction,
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

export async function deleteTransaction(id: number): Promise<void> {
    try {
        const response = await axios.delete(`http://107.20.240.135:8088/transactions/${id}`,
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

export interface FeedbackProp {
    subject: string | null,
    message: string | null,
    userEmail: string | null,
}

export async function sendFeedback(feedback: FeedbackProp): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/feedback/submit",
            feedback,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function sendUploadFile(file: FormData): Promise<UploadResult> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/transactions/parse",
            file,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export interface RecurringTransactionProp {
    id?: number | null,
    transaction: TransactionProp | null,
    frequency: string | null,
    endDate?: string | null,
}

export async function addRecurringRule(transaction: RecurringTransactionProp): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/recurring-transactions",

            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function editRecurringRule(transaction: RecurringTransactionProp): Promise<void> {
    try {
        const response = await axios.put("http://107.20.240.135:8088/recurring-transactions",

            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function deleteRecurringRule(id: number): Promise<void> {
    try {
        const response = await axios.delete(`http://107.20.240.135:8088/recurring-transactions/${id}`,
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