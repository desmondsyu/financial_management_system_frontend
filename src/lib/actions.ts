import type { Category, Labels, TransactionType, User } from "./definitions";
import { testUser1 } from "./currentuser";

export async function addBook(name: string): Promise<void> {
    const response = await fetch("http://107.20.240.135:8088/labels", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
        body: JSON.stringify({
            "name": name,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create the book");
    }
}

export async function editBook(id: number, newName: string): Promise<Labels> {
    const response = await fetch("/labels", {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
        body: JSON.stringify({
            "id": id,
            "name": newName
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to update the book");
    }

    return response.json();
}

export async function deleteBook(id: number): Promise<void> {
    const response = await fetch(`/labels/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete the book");
    }
}

export async function addCategory(name: string, transactionType: TransactionType | null, user: User): Promise<void> {
    const response = await fetch("/transaction-groups", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
        body: JSON.stringify({
            "name": name,
            "transactionType": transactionType,
            "user": user,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create the category");
    }
}

export async function editCategory(id: number, newName: string, newTransactionType: TransactionType): Promise<Category> {
    const response = await fetch("/transaction-groups", {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
        body: JSON.stringify({

        })
    });

    if (!response.ok) {
        throw new Error("Failed to edit the category");
    }

    return response.json();
}

export async function deleteCategory(id: number): Promise<Labels> {
    const response = await fetch(`/transaction-groups/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete the category")
    }

    return response.json();
}