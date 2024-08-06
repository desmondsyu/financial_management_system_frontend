import AuthCodeForm from "../../ui/login/authcode-form";
import Textfield from "../../ui/textfield";
import Button from "../../ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authCode } from "../../lib/login-actions";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await authCode(formData);
            navigate("/register/fin");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center pt-20">
            <form onSubmit={handleSubmit}>
                <p className="text-center text-lg font-bold">An email with code have been sent to your mailbox.</p>
                <Textfield type="text" name="token" placeholder="Enter code here" disabled={false} required={true} onChange={handleChange} value={formData.token} />
                <Button label="Register" disabled={false} />
            </form>
        </div>
    );
}