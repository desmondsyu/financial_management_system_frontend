import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatDateToLocal } from "../../../lib/utils";
import type { TransactionPage } from "../../../lib/definitions";
import { deleteTransaction } from "../../../lib/actions";
import clsx from "clsx";

interface TransactionTableProps {
    transactions: TransactionPage | null;
}

export default function TransactionsTable({ transactions }: TransactionTableProps) {
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
        <div className="hidden md:block">
            <div className="w-full">
                <table className="w-full bg-white border border-gray-200 table-fixed">
                    <thead>
                        <tr>
                            <th className="w-[18%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Category
                            </th>
                            <th className="w-[14%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Date
                            </th>
                            <th className="w-[28%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Description
                            </th>
                            <th className="w-[14%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Amount
                            </th>
                            <th className="w-[14%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Book
                            </th>
                            <th className="w-[10%] px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.content.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="w-[18%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal">
                                    {transaction.transactionGroup.name}
                                </td>
                                <td className="w-[14%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal">
                                    {formatDateToLocal(transaction.transactionDate)}
                                </td>
                                <td className="w-[28%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal">
                                    {transaction.description}
                                </td>
                                <td
                                    className={clsx(
                                        "w-[14%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal",
                                        {
                                            "text-green-500": transaction.amount > 0,
                                            "text-red-500": transaction.amount <= 0,
                                        }
                                    )}
                                >
                                    ${transaction.amount}
                                </td>
                                <td className="w-[14%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal">
                                    {transaction.label ? transaction.label.name : ""}
                                </td>
                                <td className="w-[10%] px-4 py-2 border-b truncate max-h-12 overflow-hidden hover:overflow-visible hover:whitespace-normal">
                                    <Link
                                        to={`${transaction.id}/edit`}
                                        state={{ transaction: transaction }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 inline-block" />
                                    </Link>
                                    <TrashIcon className="w-5 h-5 inline-block ml-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(transaction.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}