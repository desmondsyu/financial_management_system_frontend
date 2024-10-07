import TransactionsTable from "../../../ui/homepage/transactions/table";
import TransactionCards from "../../../ui/homepage/transactions/cards";
import Filter from "../../../ui/homepage/transactions/filter";
import Pagination from "../../../ui/homepage/transactions/pagination";
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchTransactions } from "../../../lib/data";
import { TransactionPage } from "../../../lib/definitions";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { MonthIncomeCard, MonthExpenseCard, ProgressLineChart } from "../../../ui/homepage/dashboard/charts";
import { CurrencyDollarIcon, ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";

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
        <div className="w-full flex justify-center pb-16 md:pb-0">
            <div className="w-[90%] flex flex-col justify-center contents-center sm:flex-row">

                <div className="flex flex-col mb-3 w-full overflow-hidden sm:hidden">
                    <div className="flex justify-around">
                        <MonthIncomeCard />
                        <MonthExpenseCard />
                    </div>
                    <ProgressLineChart />
                </div>

                <div className="pl-1 sm:pr-5 md:pr-14 mb-5">
                    <div className="relative inline-block text-left w-full mb-5">
                        <button
                            className="hidden sm:block w-52 lg:w-72 px-10 leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            onClick={() => setCreateBtnClick(!createBtnClick)}
                        >
                            Create
                        </button>

                        <button
                            className="fixed sm:hidden right-3 bottom-28 sm:bottom-3 flex flex-col items-end z-10"
                            onClick={() => setCreateBtnClick(!createBtnClick)}
                        >
                            <div
                                className="p-2 rounded-full bg-blue-500 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg">
                                <PlusIcon />
                            </div>
                        </button>

                        {createBtnClick && (
                            <>
                                <div className="hidden sm:block absolute left-0 mt-2 w-52 lg:w-72 px-1 lg:px-4 bg-white border border-gray-300 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                    <div className="p-2">
                                        <button
                                            onClick={() => navigate("create")}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out"
                                        >
                                            <CurrencyDollarIcon className="w-5 h-5 mx-2 lg:mx-4 text-gray-500" />
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

                                <div className="block sm:hidden">
                                    <button
                                        className="fixed sm:hidden right-3 bottom-52 sm:bottom-3 flex flex-col items-end z-10"
                                        onClick={() => navigate("create")}
                                    >
                                        <div
                                            className="p-2 rounded-full bg-emerald-700 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg">
                                            <CurrencyDollarIcon />
                                        </div>
                                    </button>
                                    <button
                                        className="fixed sm:hidden right-3 bottom-40 sm:bottom-3 flex flex-col items-end z-10"
                                        onClick={() => navigate("import")}
                                    >
                                        <div
                                            className="p-2 rounded-full bg-teal-500 text-white w-10 h-10 flex items-center justify-center cursor-pointer shadow-lg">
                                            <ArrowUpTrayIcon />
                                        </div>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    <Filter filterParams={filterParams} setFilterParams={setFilterParams} />
                </div>
                <div className="w-full flex-col contents-center pr-1">
                    <div className="hidden mb-3 w-full overflow-hidden sm:flex sm:flex-col md:flex-row">
                        <div className="flex justify-around">
                            <MonthIncomeCard />
                            <MonthExpenseCard />
                        </div>
                        <ProgressLineChart />
                    </div>
                    <TransactionsTable transactions={transactions} />
                    <TransactionCards transactions={transactions} />
                    <Pagination paginationParams={paginationParams} setPaginationParams={setPaginationParams} totalPages={transactions?.totalPages || 0} />
                </div>
            </div>
        </div>
    );
}