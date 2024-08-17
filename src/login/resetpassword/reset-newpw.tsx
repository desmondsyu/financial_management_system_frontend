import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../lib/login-actions";

export default function Page() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordRe, setNewPasswordRe] = useState<string>("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (newPasswordRe !== newPassword) {
                alert("Re enter password must be same.")
            }
            await resetPassword(token, newPassword);
            navigate("/resetpassword/fin")
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center pt-20">
            <form onSubmit={onSubmit}>
                <Textfield
                    type="text"
                    label="Code"
                    placeholder="Enter code here"
                    disabled={false}
                    required={true}
                    onChange={(e) => setToken(e.target.value)} />
                <Textfield
                    type="password"
                    label="New Password"
                    placeholder="Enter New password"
                    disabled={false}
                    required={true}
                    onChange={(e) => setNewPassword(e.target.value)} />
                <Textfield
                    type="password"
                    label="Re-enter Password"
                    placeholder="Enter password again"
                    disabled={false}
                    required={true}
                    onChange={(e) => setNewPasswordRe(e.target.value)}
                />
                <Button label="Reset" disabled={false} />
            </form>
        </div>
    );
}