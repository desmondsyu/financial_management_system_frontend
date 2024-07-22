import Button from "../../button";
import Textfield from "../../textfield";

export default function ProfileForm() {
    return (
        <div>
            <form>
                <Textfield type="email" label="Email" disabled={true} required={true} />
                <Textfield type="text" label="Username" disabled={false} required={true} />
                <Textfield type="date" label="Date of Birth" disabled={false} required={true} />
                <div>
                    <Button label="Update" disabled={false} />
                </div>
            </form>
            <div>
                <Button label="Reset password" disabled={false} navigateTo="/resetpassword" />
                <Button label="Delete account" disabled={false} />
            </div>
        </div>
    );
}