import axios from "axios";

interface AuthData {
    email: string,
    token: string,
}

export async function authCode(formData: AuthData): Promise<void> {
    try {
        const response = await axios.post("http://107.20.240.135:8088/verify",
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
    mStatus: string | null,
    dob: string | null,
};

export async function register(formData: RegisterData): Promise<void> {

    try {
        const response = await axios.post("http://107.20.240.135:8088/register",
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