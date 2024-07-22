import Textfield from "../../textfield";
import Button from "../../button";

export default function ReportForm() {
    return (
        <div>
            <div>
                <Textfield type="date" label="Start date" disabled={false} required={false} />
                <Textfield type="date" label="End date" disabled={false} required={false} />
            </div>
            <div>
                <Button label="download" disabled={false} />
            </div>
        </div>
    );
}