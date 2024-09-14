import { Card, CategoryBar, LineChart, BarChart, BarList, AreaChart, DonutChart } from "@tremor/react";
import { getSpendingData, getTrendData, getTrendGroupData, getGroupData, getTrendLabelData, getLabelGroupData, TimeRange, TimeSpot } from "../../../lib/data-bi";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { SpendingData, TrendData, GroupData, Labels } from "../../../lib/definitions";
import { getCurrentYearMonth } from "../../../lib/utils";
import { YearPicker, MonthPicker } from "./picker";
import { fetchBooks } from "../../../lib/data";
import { useDebounce } from "use-debounce";

const currentYearMonth = getCurrentYearMonth();

export function MonthIncomeCard() {
    const [monthIncome, setMonthIncome] = useState<number>(0);

    const fetchData = useCallback(async () => {
        const params = {
            from_year: currentYearMonth.curYear,
            from_month: currentYearMonth.curMonth,
            to_year: currentYearMonth.curYear,
            to_month: currentYearMonth.curMonth,
        };
        try {
            const response = await getTrendData(params);
            setMonthIncome(response[0]?.month_income || 0);
        } catch (error) {
            console.error("Error fetching income data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="m-1">
            <Card
                className="w-auto h-full hidden md:block"
                decoration="top"
                decorationColor="indigo"
            >
                <p className="text-tremor-default text-tremor-content md:pb-2">Income</p>
                <p className="md:text-xl text-tremor-content-strong font-semibold">${monthIncome}</p>
            </Card>
            <div className="w-auto h-full block md:hidden text-gray-700 font-semibold">
                <p>Imcome: ${monthIncome}</p>
            </div>
        </div>
    );
}

export function MonthExpenseCard() {
    const [monthExpense, setMonthExpense] = useState<number>(0);

    const fetchData = useCallback(async () => {
        const params = {
            from_year: currentYearMonth.curYear,
            from_month: currentYearMonth.curMonth,
            to_year: currentYearMonth.curYear,
            to_month: currentYearMonth.curMonth,
        };
        try {
            const response = await getTrendData(params);
            setMonthExpense(response[0]?.month_spending || 0);
        } catch (error) {
            console.error("Error fetching spending data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="m-1">
            <Card
                className="w-auto h-full hidden md:block"
                decoration="top"
                decorationColor="orange"
            >
                <p className="text-tremor-default text-tremor-content md:pb-2">Expense</p>
                <p className="md:text-xl text-tremor-content-strong font-semibold">${monthExpense}</p>
            </Card>
            <div className="w-auto h-full block md:hidden text-gray-700 font-semibold">
                <p>Expense: ${monthExpense}</p>
            </div>
        </div>
    );
}

export function ProgressLineChart() {
    const [data, setData] = useState<SpendingData>(
        {
            current_spending: 0,
            expected_spending: 0,
            upper_bound_yellow_max: 0,
            max_bound_red_max: 0,
            percent_of_spending: 0,
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getSpendingData();
                if (JSON.stringify(response) !== JSON.stringify(data)) {
                    setData(response);
                }
            } catch (error) {
                console.error("Error fetching ml data:", error);
            }
        };
        fetchData();
    }, [data]);

    const categoryValues = [
        Math.round(data.expected_spending),
        Math.round(data.upper_bound_yellow_max - data.expected_spending),
        Math.round(data.max_bound_red_max - data.upper_bound_yellow_max),
    ];

    return (
        <div className="m-1 grow">
            <Card className="w-auto h-auto" decoration="top" decorationColor="amber">
                <p className="text-tremor-default text-tremor-content flex items-center justify-between">
                    <span>Monthly spending</span>
                    <span>{data.percent_of_spending}%</span>
                </p>
                <CategoryBar
                    values={categoryValues}
                    colors={['emerald', 'yellow', 'rose']}
                    markerValue={data.current_spending}
                    className="mt-3"
                />
            </Card>
        </div>
    );
}

export function TotalTrendChart() {
    const [data, setData] = useState<TrendData[]>([]);
    const [params, setParams] = useState<TimeRange>(
        {
            from_year: currentYearMonth.curYear,
            from_month: currentYearMonth.curMonth - 3,
            to_year: currentYearMonth.curYear,
            to_month: currentYearMonth.curMonth,
        }
    );

    const [debouncedParams] = useDebounce(params, 2000);

    const fetchData = useCallback(async (params: TimeRange) => {
        try {
            const response = await getTrendData(params);
            setData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData(debouncedParams);
    }, [debouncedParams, fetchData]);

    return (
        <div>
            <Card
                className="w-auto h-full"
                decoration="top"
                decorationColor="cyan">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="Start year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_year: year,
                                    }
                                ));
                            }} />
                        <MonthPicker
                            labelName="Start month"
                            defaultValue={getCurrentYearMonth().curMonth - 3}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="End year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_year: year,
                                    }
                                ));
                            }}
                        />
                        <MonthPicker
                            labelName="End month"
                            defaultValue={getCurrentYearMonth().curMonth}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>

                </div>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-lg font-medium text-tremor-content-strong">
                        Monthly Trending
                    </h3>
                    <AreaChart
                        className="mt-4 h-72"
                        data={data}
                        index="date"
                        yAxisWidth={65}
                        categories={['month_spending', 'month_income']}
                        colors={['orange', 'sky-600']}
                    />
                </div>
            </Card>
        </div>
    );
}

type PieChartData = {
    name: string,
    value: number,
}

export function MonthGroupChart() {
    const [incomeData, setIncomeData] = useState<GroupData[]>([]);
    const [expenseData, setExpenseData] = useState<GroupData[]>([]);
    const [incomeDataMinus1, setIncomeDataMinus1] = useState<PieChartData[]>([]);
    const [expenseDataMinus1, setExpenseDataMinus1] = useState<PieChartData[]>([]);
    const [incomeDataMinus2, setIncomeDataMinus2] = useState<PieChartData[]>([]);
    const [expenseDataMinus2, setExpenseDataMinus2] = useState<PieChartData[]>([]);

    const [params, setParams] = useState<TimeSpot>({
        year: currentYearMonth.curYear,
        month: currentYearMonth.curMonth,
        return_in_type: true,
    });

    const [debouncedParams] = useDebounce(params, 2000);

    const paramsMinus1 = useMemo(() => {
        let prevMonth = params.month - 1;
        let prevYear = params.year;

        if (prevMonth === 0) {
            prevMonth = 12;
            prevYear -= 1;
        }

        return {
            year: prevYear,
            month: prevMonth,
            return_in_type: true,
        };
    }, [params]);

    const paramsMinus2 = useMemo(() => {
        let prevMonth2 = params.month - 2;
        let prevYear2 = params.year;

        if (prevMonth2 <= 0) {
            prevMonth2 += 12;
            prevYear2 -= 1;
        }

        return {
            year: prevYear2,
            month: prevMonth2,
            return_in_type: true,
        };
    }, [params]);

    const [debouncedParamsMinus1] = useDebounce(paramsMinus1, 300);
    const [debouncedParamsMinus2] = useDebounce(paramsMinus2, 300);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all([
                    getGroupData(debouncedParams),
                    getGroupData(debouncedParamsMinus1),
                    getGroupData(debouncedParamsMinus2),
                ]);

                const [currentData, minus1Data, minus2Data] = responses;

                setIncomeData(currentData.Income);
                setExpenseData(currentData.Expense);

                setIncomeDataMinus1(minus1Data.Income.map(item => ({ name: item.group_name, value: item.amount })));
                setExpenseDataMinus1(minus1Data.Expense.map(item => ({ name: item.group_name, value: item.amount })));

                setIncomeDataMinus2(minus2Data.Income.map(item => ({ name: item.group_name, value: item.amount })));
                setExpenseDataMinus2(minus2Data.Expense.map(item => ({ name: item.group_name, value: item.amount })));

            } catch (error) {
                console.error("Error fetching spending data:", error);
            }
        };

        fetchData();
    }, [debouncedParams, debouncedParamsMinus1, debouncedParamsMinus2]);

    return (
        <div>
            <Card
                className="w-auto h-full"
                decoration="top"
                decorationColor="grey">
                <div className="flex">
                    <YearPicker
                        labelName="Year"
                        defaultValue={getCurrentYearMonth().curYear}
                        onChange={(year: number) => {
                            setParams((prevData) => (
                                {
                                    ...prevData,
                                    year: year,
                                }
                            ));
                        }} />
                    <MonthPicker
                        labelName="Month"
                        defaultValue={getCurrentYearMonth().curMonth}
                        onChange={(month: number) => {
                            setParams((prevData) => (
                                {
                                    ...prevData,
                                    month: month,
                                }
                            ));
                        }}
                    />
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex justify-center items-center w-full p-1 md:w-1/2">
                        <Card
                            className="w-full h-full flex flex-col justify-center items-center"
                            decoration="top"
                            decorationColor="yellow">
                            <h3 className="text-lg font-medium text-tremor-content-strong">
                                Monthly Income Breakdown
                            </h3>
                            <BarChart
                                data={incomeData}
                                index="group_name"
                                categories={['amount']}
                                colors={['emerald-400']}
                                yAxisWidth={48}
                                onValueChange={(v) => console.log(v)}
                                showLegend={false}
                            />
                        </Card>
                    </div>
                    <div className="flex justify-center items-center w-full p-1 md:w-1/2">
                        <Card
                            className="w-full h-full flex justify-center items-center"
                            decoration="top"
                            decorationColor="green"
                        >
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <h3 className="text-lg font-medium text-tremor-content-strong">
                                    {paramsMinus1.year} - {paramsMinus1.month}
                                </h3>
                                <DonutChart
                                    data={incomeDataMinus1}
                                    variant="donut"
                                    onValueChange={(v) => console.log(v)}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <h3 className="text-lg font-medium text-tremor-content-strong">
                                    {paramsMinus2.year} - {paramsMinus2.month}
                                </h3>
                                <DonutChart
                                    data={incomeDataMinus2}
                                    variant="donut"
                                    onValueChange={(v) => console.log(v)}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex justify-center items-center w-full p-1 md:w-1/2">
                        <Card
                            className="w-full h-full flex flex-col justify-center items-center"
                            decoration="top"
                            decorationColor="yellow-800">
                            <h3 className="text-lg font-medium text-tremor-content-strong">
                                Monthly Expense Breakdown
                            </h3>
                            <BarChart
                                data={expenseData}
                                index="group_name"
                                categories={['amount']}
                                colors={['orange-400']}
                                yAxisWidth={48}
                                onValueChange={(v) => console.log(v)}
                                showLegend={false}
                            />
                        </Card>
                    </div>
                    <div className="flex justify-center items-center w-full p-1 md:w-1/2">
                        <Card
                            className="w-full h-full flex justify-center items-center"
                            decoration="top"
                            decorationColor="green-800">
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <h3 className="text-lg font-medium text-tremor-content-strong">
                                    {paramsMinus1.year} - {paramsMinus1.month}
                                </h3>
                                <DonutChart
                                    data={expenseDataMinus1}
                                    variant="donut"
                                    onValueChange={(v) => console.log(v)}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <h3 className="text-lg font-medium text-tremor-content-strong">
                                    {paramsMinus2.year} - {paramsMinus2.month}
                                </h3>
                                <DonutChart
                                    data={expenseDataMinus2}
                                    variant="donut"
                                    onValueChange={(v) => console.log(v)}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </Card>
        </div>
    );
}

type GroupTrendOutputData = {
    date: string,
    [key: string]: number | string,
}

export function GroupTrendChart() {
    const [processedData, setProcessedData] = useState<GroupTrendOutputData[]>([]);
    const [groupNames, setGroupNames] = useState<string[]>([]);
    const [params, setParams] = useState<TimeRange>(
        {
            from_year: currentYearMonth.curYear,
            from_month: currentYearMonth.curMonth - 3,
            to_year: currentYearMonth.curYear,
            to_month: currentYearMonth.curMonth,
        }
    );

    const [debouncedParams] = useDebounce(params, 2000);

    const fetchData = useCallback(async (params: TimeRange) => {
        try {
            const response = await getTrendGroupData(params);

            const categories = response.map(item => item.group_name).filter((value, index, self) => self.indexOf(value) === index);

            setGroupNames(categories);

            const groupedData: { [key: string]: any } = {};

            response.forEach(item => {
                if (!groupedData[item.date]) {
                    groupedData[item.date] = { date: item.date };
                }
                groupedData[item.date][item.group_name] = item.amount;
            });

            const processedData = Object.values(groupedData);

            setProcessedData(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData(debouncedParams);
    }, [debouncedParams, fetchData]);

    return (
        <div>
            <Card
                className="w-auto h-full z-10"
                decoration="top"
                decorationColor="teal">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="Start year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_year: year,
                                    }
                                ));
                            }} />
                        <MonthPicker
                            labelName="Start month"
                            defaultValue={getCurrentYearMonth().curMonth - 3}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="End year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_year: year,
                                    }
                                ));
                            }}
                        />
                        <MonthPicker
                            labelName="End month"
                            defaultValue={getCurrentYearMonth().curMonth}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-lg font-medium text-tremor-content-strong">
                        Categories Trending
                    </h3>
                    <LineChart
                        className="h-80"
                        data={processedData}
                        index="date"
                        categories={groupNames}
                        colors={[
                            "rose-500",   // Tremor Rose 500
                            "pink-500",   // Tremor Pink 500
                            "fuchsia-500",// Tremor Fuchsia 500
                            "violet-500", // Tremor Violet 500
                            "purple-500", // Tremor Purple 500
                            "indigo-500", // Tremor Indigo 500
                            "blue-500",   // Tremor Blue 500
                            "sky-500",    // Tremor Sky 500
                            "cyan-500",   // Tremor Cyan 500
                            "teal-500",   // Tremor Teal 500
                            "emerald-500",// Tremor Emerald 500
                            "green-500",  // Tremor Green 500
                            "lime-500",   // Tremor Lime 500
                            "yellow-500", // Tremor Yellow 500
                            "amber-500",  // Tremor Amber 500
                            "orange-500", // Tremor Orange 500
                            "red-500",    // Tremor Red 500
                            "rose-400",   // Tremor Rose 400
                            "pink-400",   // Tremor Pink 400
                            "fuchsia-400",// Tremor Fuchsia 400
                            "violet-400", // Tremor Violet 400
                            "purple-400", // Tremor Purple 400
                            "indigo-400", // Tremor Indigo 400
                            "blue-400",   // Tremor Blue 400
                            "sky-400",    // Tremor Sky 400
                            "cyan-400",   // Tremor Cyan 400
                            "teal-400",   // Tremor Teal 400
                            "emerald-400",// Tremor Emerald 400
                            "green-400",  // Tremor Green 400
                            "lime-400",   // Tremor Lime 400
                            "yellow-400", // Tremor Yellow 400
                            "amber-400",  // Tremor Amber 400
                            "orange-400", // Tremor Orange 400
                            "red-400",    // Tremor Red 400
                            "rose-600",   // Tremor Rose 600
                            "pink-600",   // Tremor Pink 600
                            "fuchsia-600",// Tremor Fuchsia 600
                            "violet-600", // Tremor Violet 600
                            "purple-600", // Tremor Purple 600
                            "indigo-600", // Tremor Indigo 600
                            "blue-600",   // Tremor Blue 600
                            "sky-600",    // Tremor Sky 600
                            "cyan-600",   // Tremor Cyan 600
                            "teal-600",   // Tremor Teal 600
                            "emerald-600",// Tremor Emerald 600
                            "green-600",  // Tremor Green 600
                            "lime-600",   // Tremor Lime 600
                            "yellow-600", // Tremor Yellow 600
                            "amber-600",  // Tremor Amber 600
                            "orange-600", // Tremor Orange 600
                        ]}
                        yAxisWidth={30}
                        showLegend={false}
                    />
                </div>
            </Card>
        </div>
    );
}

type LabelTrendOutputData = {
    label_name: string,
    totalAmount: number,
}

export function LabelTrendChart() {

    const [processedData, setProcessedData] = useState<LabelTrendOutputData[]>([]);
    const [params, setParams] = useState<TimeRange>(
        {
            from_year: currentYearMonth.curYear,
            from_month: currentYearMonth.curMonth - 3,
            to_year: currentYearMonth.curYear,
            to_month: currentYearMonth.curMonth,
        }
    );

    const [debouncedParams] = useDebounce(params, 2000);

    const fetchData = useCallback(async (params: TimeRange) => {
        try {
            const response = await getTrendLabelData(params);

            const processedData = response.reduce((acc: Record<string, number>, item: { label_name: string; amount: number }) => {
                acc[item.label_name] = (acc[item.label_name] || 0) + Math.abs(item.amount);
                return acc;
            }, {} as Record<string, number>);

            const formattedData = Object.entries(processedData).map(([label_name, totalAmount]) => ({
                label_name,
                totalAmount,
            }));

            setProcessedData(formattedData);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData(debouncedParams);
    }, [debouncedParams, fetchData]);

    return (
        <div className="w-full m-0 md:w-1/2 md:mr-2">
            <Card
                className="w-auto h-auto"
                decoration="top"
                decorationColor="sky">
                <div className="flex flex-col lg:flex-row">
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="Start year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_year: year,
                                    }
                                ));
                            }} />
                        <MonthPicker
                            labelName="Start month"
                            defaultValue={getCurrentYearMonth().curMonth - 3}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        from_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>
                    <div className="flex mt-1">
                        <YearPicker
                            labelName="End year"
                            defaultValue={getCurrentYearMonth().curYear}
                            onChange={(year: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_year: year,
                                    }
                                ));
                            }}
                        />
                        <MonthPicker
                            labelName="End month"
                            defaultValue={getCurrentYearMonth().curMonth}
                            onChange={(month: number) => {
                                setParams((prevData) => (
                                    {
                                        ...prevData,
                                        to_month: month,
                                    }
                                ));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-lg font-medium text-tremor-content-strong">
                        Book's Total
                    </h3>
                    <BarChart
                        className="mt-6"
                        data={processedData}
                        index="label_name"
                        categories={["totalAmount"]}
                        colors={["teal", "sky", "indigo", "violet", "purple"]}
                        yAxisWidth={30}
                        showLegend={false}
                    />
                </div>
            </Card>
        </div>
    );
}

type LabelGroupOutputData = {
    name: string;
    value: number;
    color: string;
};

export function LabelGroupChart() {
    const [booksList, setBooksList] = useState<Labels[]>([]);
    const [params, setParams] = useState<number>(booksList[0] ? booksList[0].id : 0);
    const [processedData, setProcessedData] = useState<LabelGroupOutputData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await fetchBooks();
                setBooksList(books || []);
            } catch (error: any) {
                console.error(error);
                throw new Error(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLabelGroupData(params);

                const processedData = response.map(item => ({
                    name: item.group_name,
                    value: Math.abs(item.amount),
                    color: item.type === "Income" ? "lime" : "orange",
                }));
                setProcessedData(processedData);
            } catch (error) {
                console.error("Error fetching spending data:", error);
            }
        };
        fetchData();
    }, [params]);

    return (
        <div className="w-full  m-0 mt-5 md:w-1/2 md:ml-2 md:mt-0">
            <Card
                className="w-auto h-full"
                decoration="top"
                decorationColor="indigo"
            >
                <div className="flex items-center space-x-2 mr-2">
                    <label
                        className="text-sm font-medium text-gray-900"
                        htmlFor="bookSelect"
                    >Books
                    </label>
                    <select
                        className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setParams(parseInt(e.target.value))
                        }}
                        value={params}
                    >
                        <option value={0} disabled>Select book</option>
                        {booksList ? booksList.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.name}
                            </option>
                        )) : (
                            <option disabled>No books available</option>
                        )}
                    </select>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-lg font-medium text-tremor-content-strong">
                        Categories of book
                    </h3>
                    <div className="w-full">
                        <BarList data={processedData} showAnimation={true} sortOrder="descending" className="mx-auto max-w-sm" />
                    </div>
                </div>
            </Card>
        </div>
    );
}


