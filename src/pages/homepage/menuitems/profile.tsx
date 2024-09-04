import Button from "../../../ui/button";
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
        <div className="flex justify-center items-center w-full">
            <div className="flex w-4/5">
                <div className="basis-1/3 mr-[5%] ml-[10%] justify-center">
                    <img src={image} alt="profile-img" className="w-auto rounded-full border-8 border-grey bg-white" />
                    <div className="mt-[10%]">
                        <Button label="Reset Password" disabled={false} onClick={handleReset} />
                        <Button label="Delete Account" disabled={false} onClick={handleDelete} />
                    </div>
                </div>
                <div className="basis-2/3 mr-[10%] ml-[5%]">
                    <Textfield type="email" label="Email" disabled={true} required={true} value={getUserFromStorage().email} />
                    <Textfield type="text" label="Username" disabled={true} required={true} value={getUserFromStorage().username} />
                    <Textfield type="date" label="Date of Birth" disabled={true} required={true} value={formatDate(getUserFromStorage().dob)} />
                    <Textfield type="text" label="Gender" disabled={true} required={true} value={getUserFromStorage().gender} />
                </div>
            </div>
        </div>
    );
}