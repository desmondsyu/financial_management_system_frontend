import Textfield from "../../textfield";
import Button from "../../button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "../../../lib/createpdf";


export default function ReportForm() {
    return (
        <>
            <div className="flex justify-center items-center pt-20">
                <div>
                    <div className="w-full flex">
                        <div className="basis-1/2">
                            <Textfield type="date" label="Start date" disabled={false} required={false} />
                        </div>
                        <div className="basis-1/2">
                            <Textfield type="date" label="End date" disabled={false} required={false} />
                        </div>
                    </div>
                    <PdfDownload />
                </div>
            </div>
            <div className="flex justify-center items-center pt-10 pb-10">
                <ReportPreview />
            </div>
        </>
    );
}

function PdfDownload() {
    return (
        <>
            <PDFDownloadLink document={<MyDocument />} fileName="report">
                {({ loading }) => (
                    loading ? (
                        <Button label="Loading report..." disabled={false} />
                    ) : (
                        <Button label="Download" disabled={false} />
                    )
                )}
            </PDFDownloadLink>
        </>
    )
}

function ReportPreview() {
    return (
        <PDFViewer width={"80%"} height={390} showToolbar={false}>
            <MyDocument />
        </PDFViewer>
    );
}