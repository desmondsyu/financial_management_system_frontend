import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatDateToLocal } from "../../../lib/utils";
import type { TransactionPage } from "../../../lib/definitions";
import { deleteTransaction } from "../../../lib/actions";

interface TransactionTableProps {
    transactions: TransactionPage | null;
}

export default function TransactionsTable(transactions: TransactionTableProps) {

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
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Book</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.transactions?.content.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>
                                        {transaction.transactionGroup.name}
                                    </td>
                                    <td>
                                        {formatDateToLocal(transaction.transactionDate)}
                                    </td>
                                    <td>
                                        {transaction.description}
                                    </td>
                                    <td>
                                        {transaction.amount}
                                    </td>
                                    <td>
                                        {transaction.label ? transaction.label.name : ""}
                                    </td>
                                    <td>
                                        <Link
                                            to={`${transaction.id}/edit`}
                                            state={{ transaction: transaction }}
                                        >
                                            <PencilSquareIcon />
                                        </Link>
                                        <TrashIcon />

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}