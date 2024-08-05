import type { Labels } from "./definitions";
import { curUserEmail, curUserPassword } from "./currentuser";

export async function AddBook(name: string): Promise<void> {
    const response = await fetch("/labels", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
        },
        body: JSON.stringify({
            "name": name
        }),
    });

    if(!response.ok){
        throw new Error('Failed to create the book');
    }   
}

export async function EditBook(id: number, newName: string): Promise<Labels> {
    const response = await fetch("/labels", {
        method: "PUT",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
        },
        body: JSON.stringify({
            "id": id,
            "name": newName
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to update the book');
    }

    return response.json();
}

export async function DeleteBook(id: number): Promise<void> {
    const response = await fetch(`/labels/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to delete the book');
    }
}