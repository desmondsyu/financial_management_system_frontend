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
import { XCircleIcon } from "@heroicons/react/24/outline";
import CreateSingleImage from "../../../ui/SingleTrx.jpg";
import CreateImportImage from "../../../ui/ImportBatch.jpg";

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
        <div className="w-full flex justify-center">
            <div className="w-[90%] flex justify-center contents-center">
                <div className="w-[30%] pr-20">
                    <div className="inline-block text-left w-full mb-5 relative">
                        <button
                            className="w-4/5 mx-[10%] leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                            onClick={() => setCreateBtnClick(!createBtnClick)}
                        >
                            Create
                        </button>

                        {createBtnClick && (
                            <div className="fixed w-[90%] md:w-[60%] lg:w-[50%] h-[50%] bg-gray-200 bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-4 md:p-8">
                                <div className="flex items-center mb-4 fixed top-5 right-5">
                                    <XCircleIcon
                                        onClick={() => setCreateBtnClick(false)}
                                        className="mr-2 p-2 rounded-full hover:bg-gray-200 w-10 h-10 cursor-pointer transition duration-300 ease-in-out"
                                        aria-label="Cancel"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row justify-around w-full gap-4 md:gap-8">
                                    <div className="flex flex-col items-center justify-center bg-white p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto">
                                        <div className="w-40 h-20 md:w-24 md:h-12 mb-4">
                                            <img src={CreateSingleImage} alt="Create Single Transaction" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <button
                                            onClick={() => navigate("create")}
                                            className="w-28 md:w-32 text-center px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg shadow-sm"
                                        >
                                            New Transaction
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center justify-center bg-white p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto">
                                        <div className="w-40 h-20 md:w-24 md:h-24 mb-4">
                                            <img src={CreateImportImage} alt="Import File Batch" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <button
                                            onClick={() => navigate("import")}
                                            className="w-28 md:w-32 text-center px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 ease-in-out rounded-lg shadow-sm"
                                        >
                                            File Import
                                        </button>
                                    </div>
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