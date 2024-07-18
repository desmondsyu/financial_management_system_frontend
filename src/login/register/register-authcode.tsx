import React from "react";
import AuthCodeForm from "../../ui/login/authcode-form.tsx";

export default function Page() {
    const label = "Register";
    return (
        <div className="flex justify-center items-center justify-center items-center pt-20">
            <AuthCodeForm label={label} />
        </div>
    );
}