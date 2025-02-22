import { MonthGroupChart, GroupTrendChart, TotalTrendChart, LabelTrendChart, LabelGroupChart } from "../../../ui/homepage/dashboard/charts";

export default function Page() {
    return (
        <>
            <div className="w-full flex justify-center pb-12 md:pb-0">
                <div className="w-[90%] justify-center">
                    <div className="mt-5 mb-5 w-full">
                        <TotalTrendChart />
                    </div>
                    <div className="mt-5 mb-5 w-full">
                        <MonthGroupChart />
                    </div>
                    <div className="mt-5 mb-5 w-full">
                        <GroupTrendChart />
                    </div>
                    <div className="flex flex-col md:flex-row mt-5 mb-5 w-full ">
                        <LabelTrendChart />
                        <LabelGroupChart />
                    </div>
                </div>
            </div>
        </>
    );
}