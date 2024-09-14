import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatDateToLocal } from "../../../lib/utils";
import type { TransactionPage } from "../../../lib/definitions";
import { deleteTransaction } from "../../../lib/actions";
import clsx from "clsx";

interface TransactionTableProps {
    transactions: TransactionPage | null;
}

export default function TransactionCards({ transactions }: TransactionTableProps) {
    const handleDelete = async (id: number) => {
        try {
            await deleteTransaction(id);
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }

    if (!transactions) return (
        <div>Loading...</div>
    );

    return (
        <div className="block md:hidden w-full">
            <div className="w-full space-y-2">
                {transactions?.content.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg border border-gray-200"
                    >
                        <div className="flex flex-col space-y-1 w-1/3">
                            <span className="font-semibold text-gray-900">
                                {transaction.transactionGroup.name}
                            </span>
                            <span className="text-sm text-gray-500">
                                {formatDateToLocal(transaction.transactionDate)}
                            </span>
                        </div>
                        <div
                            className={clsx(
                                "px-4 py-2 text-left font-semibold text-lg w-1/3",
                                {
                                    "text-green-500": transaction.amount > 0,
                                    "text-red-500": transaction.amount <= 0,
                                }
                            )}
                        >
                            ${transaction.amount}
                        </div>

                        <div className="flex items-center justify-self-end space-x-2 sm:block sm:space-x-0">
                            <Link
                                to={`${transaction.id}/edit`}
                                state={{ transaction }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                            </Link>
                            <TrashIcon
                                className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => handleDelete(transaction.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}