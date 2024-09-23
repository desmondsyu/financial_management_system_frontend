import { useState, useEffect } from "react";
import type { RecurringTransaction, FetchError } from "../../../lib/definitions";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { editRecurringRule, deleteRecurringRule } from "../../../lib/actions";
import { RecurringTransactionProp } from "../../../lib/actions";

interface RuleListProp {
    rules: RecurringTransaction[];
}

export default function BookList({ rules }: RuleListProp) {
    const [data, setData] = useState<RecurringTransaction[] | null>(rules);
    const [error, setError] = useState<FetchError | null>(null);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newRule, setNewRule] = useState<RecurringTransactionProp | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setData(rules);
    }, [rules]);

    const handleEditClick = (id: number, rule: RecurringTransaction) => {
        setIsEditing(id);
        setNewRule({
            id: rule.id,
            transaction: {
                id: rule.transaction.id,
            },
            endDate: rule.endDate,
            frequency: rule.frequency,
        });
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await deleteRecurringRule(id);
            if (data) {
                setData(data.filter((rule) => rule.id !== id));
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (id: number) => {
        try {
            setLoading(true);
            if (newRule) {
                await editRecurringRule(newRule);
                if (data) {
                    const updatedData = data.map((rule) => (rule.id === id ? { ...newRule, id } : rule));
                    setData(updatedData);
                }
                setIsEditing(null);
                setNewRule(null);
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(null);
        setNewRule(null);
    };

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (!data) {
        return <p className="text-gray-600">No matching results.</p>;
    }

    return (
        <div className="w-full p-2">
            {loading && <p className="text-gray-600">Processing...</p>}
            <ul className="space-y-2">
                {data?.map((rule) => (
                    <li key={rule.id} className="justify-between p-2 bg-white border border-gray-200 rounded shadow-sm">
                        {isEditing === rule.id ? (
                            <div className="flex flex-col p-1 items-start space-y-1">
                                <span className="w-full flex-grow text-gray-800">
                                    {rule.transaction.description ? rule.transaction.description : "-No Description-"}
                                </span>
                                <div className="flex justify-between w-full">
                                    <span className="flex-grow text-gray-800">{newRule?.frequency ?? rule.frequency}</span>
                                    <input
                                        type="date"
                                        value={newRule?.endDate ?? ""}
                                        onChange={(e) => setNewRule((prev) => ({ ...prev, endDate: e.target.value }))}
                                        className="flex-grow border border-gray-300 px-2 py-1 rounded"
                                    />
                                    <div>
                                        <button
                                            onClick={() => handleSave(rule.id)}
                                            className={`text-green-500 hover:text-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={loading}
                                        >
                                            <CheckIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <XMarkIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col p-1 items-start space-y-1">
                                <span className="w-full flex-grow text-gray-800">
                                    {rule.transaction.description ? rule.transaction.description : "-No Description-"}
                                </span>
                                <div className="flex justify-between w-full">
                                    <span className="text-gray-800">{rule.frequency}</span>
                                    <span className="w-36 text-gray-800">Until: {rule.endDate ? rule.endDate : "No End Date"}</span>
                                    <div>
                                        <button
                                            onClick={() => handleEditClick(rule.id, rule)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rule.id)}
                                            className="text-red-500 hover:text-red-700"
                                            disabled={loading}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
