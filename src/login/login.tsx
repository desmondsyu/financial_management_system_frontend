import React from "react";
import Button from '../ui/button.tsx';
import Textfield from "../ui/textfield.tsx";
import Logo from "../ui/logo.tsx";

export default function Page() {
    return (
        <div className="flex w-screen h-screen">
            <div className="w-2/3 px-5">
            </div>
            <div className="w-1/3 px-7 flex-col content-center">
                <Logo />
                <Textfield type="email" label="Email" placeholder="Enter email address" disabled={false} required={true} />
                <Textfield type="text" label="Password" placeholder="Enter password" disabled={false} required={true} />
                <p className="text-red-500 text-sm text-right"><a href="/resetpassword">Forgot password?</a></p>
                <Button label="Sign in" disabled={false} />
                <p className="text-sm">Don't have an account? <a className="underline" href="/register">Register</a></p>
            </div>
        </div>
    );
}
