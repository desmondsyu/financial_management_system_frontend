import { useState } from "react";

export function YearPicker({ labelName, defaultValue, onChange }: {
    labelName: string,
    defaultValue: number,
    onChange: (year: number) => void,
}) {
    const [selectedYear, setSelectedYear] = useState<number>();

    return (
        <div className="flex items-center space-x-1 mr-1">
            <label className="text-right w-18 text-xs font-normal text-gray-900">{labelName}</label>
            <select
                className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500"
                defaultValue={defaultValue}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const year = parseInt(e.target.value)
                    setSelectedYear(year);
                    onChange(year);
                }}>
                <option key={2023} value={2023}>2023</option>
                <option key={2024} value={2024}>2024</option>
                <option key={2025} value={2025}>2025</option>
            </select>
        </div>
    );
}

export function MonthPicker({ labelName, defaultValue, onChange }: {
    labelName: string,
    defaultValue: number,
    onChange: (month: number) => void,
}) {
    const [selectedMonth, setSelectedMonth] = useState<number>();

    return (
        <div className="flex items-center space-x-1 mr-3">
            <label className="text-right w-19 text-xs font-normal text-gray-900">{labelName}</label>
            <select
                className="w-17 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500"
                defaultValue={defaultValue}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const month = parseInt(e.target.value);
                    setSelectedMonth(month);
                    onChange(month);
                }
                }>
                <option key={1} value={1}>1</option>
                <option key={2} value={2}>2</option>
                <option key={3} value={3}>3</option>
                <option key={4} value={4}>4</option>
                <option key={5} value={5}>5</option>
                <option key={6} value={6}>6</option>
                <option key={7} value={7}>7</option>
                <option key={8} value={8}>8</option>
                <option key={9} value={9}>9</option>
                <option key={10} value={10}>10</option>
                <option key={11} value={11}>11</option>
                <option key={12} value={12}>12</option>
            </select>
        </div >
    );
}