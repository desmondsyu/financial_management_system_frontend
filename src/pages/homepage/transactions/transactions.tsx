import TransactionsTable from "../../../ui/homepage/transactions/table";
import Button from "../../../ui/button";
import Filter from "../../../ui/homepage/transactions/filter";
import Pagination from "../../../ui/homepage/transactions/pagination";
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchTransactions } from "../../../lib/data";
import { TransactionPage } from "../../../lib/definitions";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { MonthIncomeCard, MonthExpenseCard, ProgressLineChart } from "../../../ui/homepage/dashboard/charts";
import { XCircleIcon, CurrencyDollarIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

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

    const [createBtnClick, setCreateBtnClick] = useState<boolean>(false);

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

    useEffect(() => {
        fetchData(debouncedParams);
    }, [debouncedParams, fetchData]);

    return (
        <div className="w-full flex justify-center pb-12 md:pb-0">
            <div className="w-[90%] flex justify-center contents-center">
                <div className="w-[30%] pr-20">
                    <div className="relative inline-block text-left w-full mb-5">
                        <button
                            className="w-4/5 mx-[10%] leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            onClick={() => setCreateBtnClick(!createBtnClick)}
                        >
                            Create
                        </button>

                        {createBtnClick && (
                            <div className="absolute left-0 mt-2 w-4/5 mx-[10%] bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                <div className="p-2">
                                    <button
                                        onClick={() => navigate("create")}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
                                    >
                                        <CurrencyDollarIcon className="w-5 h-5 mx-4 text-gray-500" />
                                        New Transaction
                                    </button>
                                    <button
                                        onClick={() => navigate("import")}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
                                    >
                                        <ArrowUpTrayIcon className="w-5 h-5 mx-4 text-gray-500" />
                                        File Import
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
                </div>
                <div className="w-[70%] flex flex-col contents-center">
                    <div className="flex mt-5 mb-5 w-full overflow-hidden">
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