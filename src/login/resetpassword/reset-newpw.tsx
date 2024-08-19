import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../lib/login-actions";

export default function Page() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPasswordRe] = useState<string>("");
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (confirmPassword !== newPassword) {
                alert("Passwords do not match.")
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
            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setConfirmPasswordRe(e.target.value)}
                />
                <Button label="Reset" disabled={false} />
            </form>
        </div>
    );
}