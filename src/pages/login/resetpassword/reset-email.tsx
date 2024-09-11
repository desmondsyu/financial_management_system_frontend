import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState } from "react";
import { sendResetEmail } from "../../../lib/login-actions";
import { useNavigate } from "react-router-dom";

export default function Page() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await sendResetEmail(email);
            setIsSent(true);
        } catch (error: any) {
            console.error(error);
            window.alert("Failed to send email, please try again");
        }
    };

    return (
        <div className="flex justify-center items-center pt-20">
            {!isSent ? (
                <form
                    className="w-96"
                    onSubmit={handleSubmit}>
                    <p className="text-center text-lg font-bold">Enter your registered email address.</p>
                    <Textfield
                        type="email"
                        placeholder="Enter email address"
                        disabled={false}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Button label="Send code" disabled={false} />
                </form>
            ) : (
                <div>
                    <p className="text-center text-lg font-bold">Use the link in the email to reset password.</p>
                    <Button label="Close" disabled={false} onClick={() => navigate('/')} />
                </div>
            )}
        </div>
    );
}