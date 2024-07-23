import Textfield from "../../textfield";
import Button from "../../button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "../../../lib/createpdf";


function PdfDownload() {
    return (
        <>
            <PDFDownloadLink document={<MyDocument />} fileName="report">
                {({ loading }) => (
                    loading ? (
                        <Button label="Loading..." disabled={false} />
                    ) : (
                        <Button label="Download" disabled={false} />
                    )
                )}
            </PDFDownloadLink>
        </>
    )
}

export default function ReportForm() {
    return (
        <div>
            <div>
                <Textfield type="date" label="Start date" disabled={false} required={false} />
                <Textfield type="date" label="End date" disabled={false} required={false} />
            </div>
            <div>
                <PdfDownload />
            </div>
        </div>
    );
}