import { useState } from "react";
import { sendUploadFile } from "../../../lib/actions";

export default function ImportTransaction() {
    const [csvFile, setCsvFile] = useState<Blob | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) setCsvFile(e.currentTarget.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!csvFile) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", csvFile);

        try {
            const res = await sendUploadFile(formData);
            console.log(res);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>Download template</p>
                <input type="file" accept=".csv" onChange={handleChange} />
                <button type="submit">
                    Upload
                </button>
            </form>
        </>
    );
}