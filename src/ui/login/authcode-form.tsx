import Button from "../button";
import Textfield from "../textfield";

export default function AuthCodeForm({ label }: {label: string}) {
    return (
        <div>
            <p className="text-center text-lg font-bold">An email with code have been sent to your mailbox.</p>
            <Textfield type="text" placeholder="Enter code here" disabled={false} required={true} />
            <div className="w-full flex">
                <div className="basis-1/2">
                    <Button label={label} disabled={false} />
                </div>
                <div className="basis-1/2">
                    <Button label="Resend" disabled={false} />
                </div>
            </div>
        </div>
    );
}
