import { MonthGroupChart, GroupTrendChart, TotalTrendChart, LabelTrendChart, LabelGroupChart } from "../../../ui/homepage/dashboard/charts";

export default function Page() {
    return (
        <>
            <div className="w-full flex justify-center">
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
                    <div className="flex mt-5 mb-5 w-full ">
                        <LabelTrendChart />
                        <LabelGroupChart />
                    </div>
                </div>
            </div>
        </>
    );
}