import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { feedbackTopics } from "../lib/data";
import { sendFeedback, FeedbackProp } from "../lib/actions";


export default function FeedBack() {
    const [formShow, setFormShow] = useState<boolean>(false);
    const [formData, setFormData] = useState<FeedbackProp>({
        userEmail: localStorage.getItem("authEmail"),
        subject: null,
        message: null,
    });

    const handleClick = () => {
        setFormShow(!formShow);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await sendFeedback(formData);
            setFormShow(false);
        } catch (error) {
            console.error("Error sending feedback:", error);
        }
    }
    return (
        <div className="fixed right-3 bottom-3 flex flex-col items-end">            {formShow && (
            <div className="mt-2 mb-1 p-4 bg-gray-200 rounded ">
                <form onSubmit={handleSubmit} >
                    <label className="block mb-2 text-sm font-sm text-gray-900">Topic</label>
                    <select
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                subject: "CashCalm Feedback - [" + e.target.value + "]",
                            }))
                        }}>
                        <option defaultChecked disabled value="">Select a topic</option>
                        {feedbackTopics.map((topic) => {
                            return (<option value={topic.name}>{topic.name}</option>);
                        })}
                    </select>

                    <label className="block mb-1 text-sm font-sm text-gray-900">Message</label>
                    <textarea
                        className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        rows={4}
                        placeholder="Your message here..."
                        onChange={(e) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                message: e.target.value,
                            }))
                        }} />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-2 rounded">Submit</button>
                </form>
            </div>
        )}

            <div
                onClick={handleClick}
                className="p-2 rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg">
                <ChatBubbleOvalLeftEllipsisIcon />
            </div>
        </div>
    );
}