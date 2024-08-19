import TransactionsTable from "../../ui/homepage/transactions/table";
import Button from "../../ui/button";
import Filter from "../../ui/homepage/transactions/filter";
import Pagination from "../../ui/homepage/transactions/pagination";
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchTransactions } from "../../lib/data";
import { TransactionPage } from "../../lib/definitions";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {MonthIncomeCard, MonthExpenseCard, ProgressLineChart} from "../../ui/homepage/dashboard/charts"

interface PaginationParams {
    page: number,
    size: number,
    sort: string[],
}

interface FilterParams {
    fromDate: string | null;
    toDate: string | null;
    label: string | null;
    type: number | null;
    group: string | null;
}

type FetchParams = {
    paginationParams: PaginationParams;
    filterParams: FilterParams;
}

export default function Page() {
    const navigate = useNavigate();

    const [paginationParams, setPaginationParams] = useState<PaginationParams>({
        page: 0,
        size: 10,
        sort: ["transactionDate,desc"],
    });

    const [filterParams, setFilterParams] = useState<FilterParams>({
        fromDate: null,
        toDate: null,
        label: null,
        type: null,
        group: null,
    });

    const [transactions, setTransactions] = useState<TransactionPage | null>(null);

    const combinedParams = useMemo(() => ({
        paginationParams,
        filterParams,
    }), [paginationParams, filterParams]);

    const [debouncedParams] = useDebounce(combinedParams, 500);

    const fetchData = useCallback(async (params: FetchParams) => {
        try {
            const data = await fetchTransactions({
                ...params.paginationParams,
                ...params.filterParams,
            });
            setTransactions(data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(()=>{
        fetchData(debouncedParams);
    },[debouncedParams,fetchData]);

    return (
        <div className="w-full flex justify-center ">
            <div className="w-[90%] flex justify-center contents-center">
                <div className="w-[30%] pr-20">
                    <Button label="Create" disabled={false} onClick={() => navigate("create")} />
                    <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
                </div>
                <div className="w-[70%]">
                <div className="flex mt-5 mb-5 w-full">
                        <MonthIncomeCard />
                        <MonthExpenseCard />
                        <ProgressLineChart />
                    </div>
                    <TransactionsTable transactions={transactions} />
                    <Pagination paginationParams={paginationParams} setPaginationParams={setPaginationParams} totalPages={transactions?.totalPages || 0} />
                </div>
            </div>
        </div>

    );
}