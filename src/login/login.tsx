import Button from '../ui/button';
import Textfield from "../ui/textfield";
import Logo from "../ui/logo.tsx";
// import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState } from 'react';

export default function Page() {
    // const signIn = useSignIn();
    const [formData, setFormData] = useState({ "email": "", "token": "" });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/verify", {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": formData.email,
                    "token": formData.token
                }),
            });

            console.log('Payload:', JSON.stringify({
                email: formData.email,
                token: formData.token
            }));

            if (response.ok) {
                console.log("succeed");
            } else {
                console.log("failed");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex w-screen h-screen">
            
            <div className="w-2/3 px-5">
            </div>
            <form className="w-1/3 px-7 flex-col content-center" onSubmit={onSubmit}>
                <Logo />
                <Textfield type="email" label="Email" placeholder="Enter email address" disabled={false} required={true} 
                // onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
                <Textfield type="password" label="Password" placeholder="Enter password" disabled={false} required={true} 
                // onChange={(e) => setFormData({ ...formData, token: e.target.value })} 
                />
                <p className="text-red-500 text-sm text-right"><a href="/resetpassword">Forgot password?</a></p>
                <Button label="Sign in" disabled={false} />
                <p className="text-sm">Don't have an account? <a className="underline" href="/register">Register</a></p>
            </form>
        </div>
    );
}
