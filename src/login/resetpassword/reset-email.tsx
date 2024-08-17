import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState } from "react";
import { sendToken } from "../../lib/login-actions";
import { useNavigate } from "react-router-dom";

export default function Page() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await sendToken(email);
            navigate("/resetpassword/reset");
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center pt-20">
            <form onSubmit={onSubmit}>
                <p className="text-center text-lg font-bold">Enter your registered email address.</p>
                <Textfield
                    type="email"
                    placeholder="Enter email address"
                    disabled={false}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)} />
                <Button label="Send code" disabled={false} />
            </form>
        </div>
    );
}