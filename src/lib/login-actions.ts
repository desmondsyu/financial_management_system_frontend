import axios from "axios";

interface AuthData {
    email: string,
    token: string,
}

export async function authCode(formData: AuthData): Promise<void> {
    try {
        await axios.post("https://107.20.240.135:8088/fin-api/verify",
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
        await axios.post("https://107.20.240.135:8088/fin-api/register",
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
        await axios.post("https://107.20.240.135:8088/fin-api/forgot-password",
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
        await axios.post(`https://107.20.240.135:8088/fin-api/reset-password?token=${token}`,
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
        await axios.delete("https://107.20.240.135:8088/fin-api/users",
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