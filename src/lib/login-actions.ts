import { testUser1 } from "./currentuser";
import { User } from "./definitions";

interface AuthData {
    email: string,
    token: string,
}

export async function authCode(formData: AuthData): Promise<void> {
    try {
        const response = await fetch("/verify", {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to verify");
        }
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

interface RegisterData {
    email: string,
    username: string,
    password: string,
    mStatus: string | null,
    dob: string | null,
};

export async function register(formData: RegisterData): Promise<void> {
    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to register");
        }
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}

export async function allUser(): Promise<User[]> {
    try {
        const response = await fetch("/users", {
            method: "GET",
            headers: {
                "Accept": "*/*",
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        return response.json();
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}