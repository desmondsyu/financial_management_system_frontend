import React from "react";
import Button from "../button.tsx";
import Textfield from "../textfield.tsx";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {

    return (
        <div>
            <Textfield type="email" label="Email" placeholder="Enter email address" disabled={false} required={true} />
            <Textfield type="text" label="Username" placeholder="Enter username" disabled={false} required={true} />
            <Textfield type="text" label="Password" placeholder="Enter password" disabled={false} required={true} />
            <Textfield type="date" label="Date of Birth" disabled={false} required={false} />
            <Button label="Register"  disabled={false} />
        </div>
    );
}