import { Card, CategoryBar } from "@tremor/react";
import { progress } from "../../lib/testdata";

export default function Page() {
    return (
        <>
            <Card className="mx-auto max-w-sm">
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                    <span>Monthly spending</span>
                    <span>{progress.percent_of_spending}</span>
                </p>
                <CategoryBar
                    values={[progress.expected_spending, progress.lower_bound_yellow_max - progress.expected_spending, progress.upper_bound_red_max - progress.lower_bound_yellow_max]}
                    colors={['emerald', 'yellow', 'rose']}
                    markerValue={progress.current_spending}
                    className="mt-3"
                />
            </Card>
        </>
    );
}