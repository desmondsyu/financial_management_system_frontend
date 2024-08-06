import TransactionsTable from "../../ui/homepage/transactions/tx-table";
import Button from "../../ui/button";
import { fetchTransactions } from "../../lib/data";

const page=0;
const size=3;
const sort=["transactionDate"]
const handleClick = async () => fetchTransactions({page:page, size:size, sort:sort});

export default function Page(){
    return (
        <>
            <Button label="test" disabled={false} onClick={handleClick}/>
            <TransactionsTable />
        </>
    );
}