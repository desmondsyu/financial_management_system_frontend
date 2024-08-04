import type { Labels } from "./definitions";
import { curUserEmail, curUserPassword } from "./currentuser";

export async function AddBook(id: number, name: string) {
    const reponse = await fetch("/labels", {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
        },
        body: JSON.stringify({
            "id": id,
            "name": name
        }),
    })
}

export async function EditBook(id: number, newName: string): Promise<Labels> {
    const reponse = await fetch("/labels", {
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

    if(!reponse.ok) {
        throw new Error('Failed to update the book');
    }

    return reponse.json();
}

export async function DeleteBook(id: number): Promise<void> {
    const reponse = await fetch(`/labels/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "*/*",
            "Authorization": `Basic ${btoa(`${curUserEmail}:${curUserPassword}`)}`,
        },
    })

    if(!reponse.ok) {
        throw new Error('Failed to delete the book');
    }
}