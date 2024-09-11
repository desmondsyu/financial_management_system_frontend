import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authCode } from "../../../lib/login-actions";

export default function Page() {
    const [formData, setFormData] = useState({
        email: "",
        token: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("registerFormData");
        if (storedData) {
            const parsed = JSON.parse(storedData);
            setFormData({
                email: parsed.email,
                token: ""
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await authCode(formData);
            navigate("/register/fin");
        } catch (error) {
            console.error(error);
            window.alert("Submit failed")
        }
    }

    return (
        <div className="flex justify-center items-center pt-20">
            <form
                className="w-96"
                onSubmit={handleSubmit}>
                <p className="text-center text-lg font-bold">An email with code have been sent to your mailbox.</p>
                <Textfield
                    type="text"
                    placeholder="Enter code here"
                    disabled={false}
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFormData((prevData) => ({
                            ...prevData,
                            token: e.target.value,
                        }));
                    }}
                    value={formData.token} />
                <Button label="Register" disabled={false} type="submit" />
            </form>
        </div>
    );
}