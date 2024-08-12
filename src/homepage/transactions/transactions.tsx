import TransactionsTable from "../../ui/homepage/transactions/tx-table";
import Button from "../../ui/button";
import { fetchTransactions } from "../../lib/data";

export default function Page(){
    return (
        <>
            <TransactionsTable />
        </>
    );
}