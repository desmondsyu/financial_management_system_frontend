import React from "react";
import NewPwForm from "../../ui/login/new-password-form.tsx";

export default function Page(){
    return (
        <div className="flex justify-center items-center justify-center items-center pt-20">
            <div className="w-1/3">
            <NewPwForm />
            </div>
        </div>
    );
}