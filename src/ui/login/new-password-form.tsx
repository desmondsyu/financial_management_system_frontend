import Button from "../button";
import Textfield from "../textfield";

export default function NewPwForm() {
    return (
        <div>
            <p className="text-center text-lg font-bold">Reset your password.</p>
            <Textfield type="text" label="New Password" placeholder="Enter New password" disabled={false} required={true} />
            <Textfield type="text" label="Re-enter Password" placeholder="Enter password again" disabled={false} required={true} />
            <Button label="Reset" disabled={false} />
        </div>
    );
}