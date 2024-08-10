import axios from "axios";

export async function getSpendingData() {
    try {
        const response = await axios.get("http://18.220.232.147/get_spending_data",
            {
                headers: {
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