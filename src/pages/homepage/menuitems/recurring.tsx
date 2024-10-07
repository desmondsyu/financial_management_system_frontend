import { fetchRecurringRules } from "../../../lib/data";
import { useState, useEffect } from "react";
import type { RecurringTransaction } from "../../../lib/definitions";
import RuleList from "../../../ui/menuitems/recurring/rule-list";


export default function Recurring() {
    const [rules, setRules] = useState<RecurringTransaction[]>([]);

    useEffect(() => {
        const loadRules = async () => {
            try {
                const initialRules = await fetchRecurringRules();
                setRules(initialRules);
            } catch (error) {
                console.error(error);
                window.alert("Unable to load rule list");
            }
        };
        loadRules();
    }, []);

    return (
        <div className="flex justify-center items-center w-full pb-12 md:pb-0">
            <div className="flex justify-center flex-col w-96">
                <div className="w-full">
                    <RuleList rules={rules} />
                </div>
            </div>
        </div>
    );
}