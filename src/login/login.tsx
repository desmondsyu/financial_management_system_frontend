import Button from '../ui/button';
import Textfield from "../ui/textfield";
import Logo from "../ui/logo.tsx";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { User } from '../lib/definitions.ts';

export default function Page() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            "email": "",
            "password": "",
        }
    );


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.get("http://107.20.240.135:8088/labels",
                {
                    headers: {
                        "Authorization": `Basic ${btoa(`${formData.email}:${formData.password}`)}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            const response = async (): Promise<User> => {
                try {
                    const response = await axios("http://107.20.240.135:8088/users",
                        {
                            headers: {
                                "Accept": "*/*",
                                "Authorization": `Basic ${btoa(`${formData.email}:${formData.password}`)}`,
                            },
                        },
                    );
                    const users = response.data;
                    const user = users.find((user: User) => user.email === formData.email);
                    if (!user) {
                        throw new Error("User not found");
                    }
                    return user;
                } catch (error: any) {
                    console.error(error);
                    throw new Error(error.message);
                }
            };
            const currentUser = await response();
            localStorage.setItem("currentUserInfo", JSON.stringify(currentUser));
            localStorage.setItem("authEmail", formData.email);
            localStorage.setItem("authPw", formData.password);

            navigate("/transactions");
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    return (
        <div className="flex w-screen h-screen">

            <div className="w-2/3 px-5">
            </div>
            <form className="w-1/3 px-7 flex-col content-center" onSubmit={onSubmit}>
                <Logo />
                <Textfield
                    type="email"
                    label="Email"
                    placeholder="Enter email address"
                    disabled={false}
                    required={true}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Textfield
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    disabled={false}
                    required={true}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <p className="text-red-500 text-sm text-right"><a href="/confirmemail">Forgot password?</a></p>
                <Button label="Sign in" disabled={false} />
                <p className="text-sm">Don't have an account? <a className="underline" href="/register">Register</a></p>
            </form>
        </div>
    );
}
