import Button from "../button";
import Textfield from "../textfield";

export default function EnterEmailForm() {
    return (
        <div>
            <p className="text-center text-lg font-bold">Enter your registered email address.</p>
            <Textfield type="email" placeholder="Enter email address" disabled={false} required={true} />
            <Button label="Send code" disabled={false} />
        </div>
    );
}