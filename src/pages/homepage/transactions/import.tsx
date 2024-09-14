import { useState, useRef } from "react";
import { sendUploadFile } from "../../../lib/actions";
import type { UploadResult } from "../../../lib/definitions";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ImportTransaction() {
    const [csvFile, setCsvFile] = useState<Blob | null>(null);
    const [responseData, setResponseData] = useState<UploadResult | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setCsvFile(e.currentTarget.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!csvFile) {
            alert("Please select a file before uploading.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", csvFile);

        try {
            const res = await sendUploadFile(formData);

            setResponseData(res);
        } catch (error: any) {
            console.error(error);
        } finally {
            setUploading(false);
            setCsvFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className="w-full flex justify-center contents-center">
            <div className="w-96">
                <div className="flex items-center mb-4">
                    <ArrowLeftCircleIcon
                        onClick={() => navigate(-1)}
                        className="mr-2 p-2 rounded-full hover:bg-gray-200 w-10 h-10"
                        aria-label="Go back" />
                    <h2 className="text-lg font-semibold text-gray-900">Back</h2>
                </div>
                <p className="mb-4">
                    <a
                        download="transactions_template"
                        href={`${process.env.PUBLIC_URL}/transactions_template.csv`}
                        className="text-blue-500 hover:text-blue-700 underline"
                    >
                        Download template
                    </a>
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-4"
                >
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <button
                        type="submit"
                        className="w-auto px-3 leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        Upload
                    </button>
                </form >
                {!uploading && responseData &&
                    <>
                        <p className="mt-4 text-gray-700">
                            Total lines:{" "}
                            <span className="font-bold">
                                {responseData.successfulTransactions.length + responseData.failedTransactions.length}
                            </span>
                        </p>
                        <p className="text-green-600">
                            Successful lines:{" "}
                            <span className="font-bold">
                                {responseData.successfulTransactions.length}
                            </span>
                        </p>
                        <p className="text-red-600">
                            Failed lines:{" "}
                            <span className="font-bold">
                                {responseData.failedTransactions.length}
                            </span>
                        </p>
                        <ul className="list-disc pl-6">
                            {responseData.failedTransactions.map((line) => (
                                <li key={line.line} className="text-red-500">
                                    Line number: {line.line}, Failed reason: {line.reason}.
                                </li>
                            ))}
                        </ul>
                    </>
                }
            </div>
        </div>
    );
}