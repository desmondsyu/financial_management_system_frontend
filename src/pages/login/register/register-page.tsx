import Textfield from "../../../ui/textfield";
import Button from "../../../ui/button";
import { useState } from "react";
import { register } from "../../../lib/login-actions";
import { useNavigate } from "react-router-dom";

export default function Page() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        gender: "",
        dob: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataWithISODate = {
            ...formData,
            dob: formData.dob ? new Date(formData.dob).toISOString() : null,
        };

        localStorage.setItem("registerFormData", JSON.stringify(formDataWithISODate));

        try {
            await register(formDataWithISODate);
            navigate("/register/auth")
        } catch (error) {
            console.error(error);
            window.alert("Error connecting database");
        }
    };

    return (
        <div className="flex justify-center items-center pt-20">
            <div className="w-96">
                <form onSubmit={handleSubmit}>
                    <Textfield type="email" name="email" label="Email" placeholder="Enter email address" disabled={false} required={true} onChange={handleChange} value={formData.email} />
                    <Textfield type="text" name="username" label="Username" placeholder="Enter username" disabled={false} required={true} onChange={handleChange} value={formData.username} />
                    <Textfield type="password" name="password" label="Password" placeholder="Enter password" disabled={false} required={true} onChange={handleChange} value={formData.password} />
                    <div className="p-2.5">
                        <label className="block mb-2 text-md font-medium text-gray-900">
                            Gender
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleChange}
                            name="gender"
                            value={formData.gender}
                        >
                            <option key="M" value="M">M</option>
                            <option key="F" value="F">F</option>
                            <option key="OTHER" value="OTHER">OTHER</option>
                        </select>
                    </div>
                    <Textfield type="date" name="dob" label="Date of Birth" disabled={false} required={false} onChange={handleChange} value={formData.dob} />
                    <Button label="Register" disabled={false} type="submit" />
                </form>
            </div>
        </div>
    );
}
