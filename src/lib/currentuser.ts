import type { User } from "./definitions";

export function getUserFromStorage(): User {
    const userString = localStorage.getItem("currentUserInfo");
    if (!userString) {
        throw new Error("No user found in session");
    }
    try {
        const user = JSON.parse(userString);
        return user;
    } catch (error: any) {
        console.error("Failed to parse user data:", error);
        throw new Error(error.message);
    }
}