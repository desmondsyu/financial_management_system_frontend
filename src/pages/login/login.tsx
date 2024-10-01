import Button from '../../ui/button';
import Textfield from "../../ui/textfield";
import Logo from "../../ui/logo.tsx";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../lib/definitions.ts';
import dashboardImage from "../../ui/dashboard.png";
import transactionImage from "../../ui/transactionpage.png";
import { javaApi } from '../../lib/apidomains.ts';

export default function Page() {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            "email": "",
            "password": "",
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.get(`${javaApi}/labels`,
                {
                    headers: {
                        "Authorization": `Basic ${btoa(`${formData.email}:${formData.password}`)}`,
                        "Content-Type": "application/json",
                    },
                },
            );

            const response = await axios(`${javaApi}/users`,
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
            localStorage.setItem("currentUserInfo", JSON.stringify(user));
            localStorage.setItem("authEmail", formData.email);
            localStorage.setItem("authPw", formData.password);

            navigate("/transactions");
        } catch (error: any) {
            console.error(error);
            setError("Incorrect credentials");
        }
    }

    const images = [
        transactionImage,
        dashboardImage,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="flex w-screen h-screen justify-center">
            <div className="w-2/3 px-5 m-5 justify-center items-center hidden lg:block">
                <div className="relative w-full h-full">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className={`absolute inset-0 w-auto h-auto max-w-full max-h-full m-auto transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>
            </div>
            <form className="w-4/5 px-7 flex flex-col justify-center content-center md:w-3/4 lg:w-1/3" onSubmit={handleSubmit}>
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button label="Sign in" disabled={false} type="submit" />
                <p className="text-sm">Don't have an account? <a className="underline" href="/register">Register</a></p>
            </form>
        </div>
    );
}
