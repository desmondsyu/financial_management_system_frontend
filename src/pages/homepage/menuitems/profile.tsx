import Textfield from "../../../ui/textfield";
import { getUserFromStorage } from "../../../lib/currentuser";
import { formatDate } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../lib/login-actions";

export default function Page() {
    const navigate = useNavigate();
    const image = `https://robohash.org/${getUserFromStorage().username}`;

    const handleReset = () => {
        navigate("/confirmemail");
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? All your data will be lost. This action cannot be undone.");

        if (confirmed) {
            try {
                await deleteUser();
                localStorage.clear();
                navigate("/");
            } catch (error: any) {
                alert("There was an error deleting your account. Please try again later.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full pb-12 md:pb-0">
            <div className="flex justify-center flex-col md:flex-row">
                <div className="flex flex-col w-96 mr-5 ml-10 justify-center items-center md:w-48">
                    <img src={image} alt="profile-img" className="w-48 rounded-full border-8 border-grey bg-white md:w-72" />
                    <button
                        className="mt-5 w-4/5 leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        onClick={handleReset}>
                        Reset Password
                    </button>
                    <button
                        className="mt-5 w-4/5 leading-10 text-md bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-red-300 disabled:cursor-not-allowed"
                        onClick={handleDelete}>
                        Delete Account
                    </button>
                </div>
                <div className="w-96 mr-10 ml-5">
                    <Textfield type="email" label="Email" disabled={true} required={true} value={getUserFromStorage().email} />
                    <Textfield type="text" label="Username" disabled={true} required={true} value={getUserFromStorage().username} />
                    <Textfield type="date" label="Date of Birth" disabled={true} required={true} value={formatDate(getUserFromStorage().dob)} />
                    <Textfield type="text" label="Gender" disabled={true} required={true} value={getUserFromStorage().gender} />
                </div>
            </div>
        </div>
    );
}