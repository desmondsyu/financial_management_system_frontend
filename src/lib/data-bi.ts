import axios from "axios";
import type { SpendingData, TrendData, GroupData, TypeGroupData, LabelGroupData } from "./definitions";

export interface TimeRange {
    from_year: number,
    from_month: number,
    to_year: number,
    to_month: number,
}

export interface TimeSpot {
    year: number,
    month: number,
    return_in_type: boolean,
}

// Get spending analysis
export async function getSpendingData(): Promise<SpendingData> {
    try {
        const response = await axios.get("https://primary-mustang-eagerly.ngrok-free.app/spending/analysis",
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

// get trend data income and expense
export async function getTrendData({ from_year, from_month, to_year, to_month }: TimeRange): Promise<TrendData[]> {
    try {
        const queryParams = new URLSearchParams({
            from_year: from_year.toString(),
            from_month: from_month.toString(),
            to_year: to_year.toString(),
            to_month: to_month.toString(),
        });

        const response = await axios.get(`https://primary-mustang-eagerly.ngrok-free.app/spending/income-expense/in-range?${queryParams}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

// get group breakdown data
export async function getGroupData({year, month, return_in_type}: TimeSpot): Promise<TypeGroupData>{
    try {
        const queryParams = new URLSearchParams({
            year: year.toString(),
            month: month.toString(),
            return_in_type: return_in_type.toString(),
        });

        const response = await axios.get(`https://primary-mustang-eagerly.ngrok-free.app/spending/transection-group/in-month/?${queryParams}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}   

// get breakdown trend data in group
export async function getTrendGroupData({ from_year, from_month, to_year, to_month }: TimeRange): Promise<GroupData[]>{
    try {
        const queryParams = new URLSearchParams({
            from_year: from_year.toString(),
            from_month: from_month.toString(),
            to_year: to_year.toString(),
            to_month: to_month.toString(),
        });

        const response = await axios.get(`https://primary-mustang-eagerly.ngrok-free.app/spending/transaction-group/in-range?${queryParams}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

// get breakdown trend data in label
export async function getTrendLabelData({ from_year, from_month, to_year, to_month }: TimeRange): Promise<LabelGroupData[]>{
    try {
        const queryParams = new URLSearchParams({
            from_year: from_year.toString(),
            from_month: from_month.toString(),
            to_year: to_year.toString(),
            to_month: to_month.toString(),
        });

        const response = await axios.get(`https://primary-mustang-eagerly.ngrok-free.app/spending/lable/in-range?${queryParams}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}

// get group spending in label
export async function getLabelGroupData(id: number): Promise<GroupData[]>{
    try {
        const response = await axios.get(`https://primary-mustang-eagerly.ngrok-free.app/spending/label/in-transaction-group?label_id=${id}`,
            {
                headers: {
                    "ngrok-skip-browser-warning": "20230",
                    "Accept": "application/json",
                    "Authorization": `Basic ${btoa(`${localStorage.getItem("authEmail")}:${localStorage.getItem("authPw")}`)}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}