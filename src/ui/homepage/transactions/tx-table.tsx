import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { transactions } from "../../../lib/testdata";
import { Link } from "react-router-dom";
import { formatDateToLocal } from "../../../lib/utils";

export default  function TransactionsTable() {
    const tx =  transactions;
    return (
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
                    tx?.map((transaction) => (
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
                                    to=""
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
    );
}