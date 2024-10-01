import axios from "axios";
import { javaApi } from "./apidomains";

interface AuthData {
    email: string,
    token: string,
}

export async function authCode(formData: AuthData): Promise<void> {
    try {
        await axios.post(`${javaApi}/verify`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

interface RegisterData {
    email: string,
    username: string,
    password: string,
    gender: string | null,
    dob: string | null,
};

export async function register(formData: RegisterData): Promise<void> {
    try {
        await axios.post(`${javaApi}/register`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                }
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function sendResetEmail(email: string): Promise<void> {
    try {
        await axios.post(`${javaApi}/forgot-password`,
            {
                email: email,
            },
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                }
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function resetPassword(token: string | null, newPassword: string): Promise<void> {
    try {
        await axios.post(`${javaApi}/reset-password?token=${token}`,
            {
                password: newPassword,
            },
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                }
            },
        );
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

export async function deleteUser(): Promise<void> {
    try {
        await axios.delete(`${javaApi}/users`,
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