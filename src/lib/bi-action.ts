import axios from "axios";
import { testUser1 } from "./currentuser";



export async function getSpendingData() {
    try {
        const response = await fetch("http://18.220.232.147/get_spending_data", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Basic ${btoa(`${testUser1.email}:${testUser1.password}`)}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed");
        }
        return response.json();
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw new Error(error.message);
    }
}