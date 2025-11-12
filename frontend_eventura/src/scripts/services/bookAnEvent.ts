import type { BookEvents } from "../models/bookEvent";
import {API_URL} from "../constants";

const BASE_URL = `${API_URL}api/`;

export const bookAnEvent = async (bookevent: BookEvents) => {
    try {
        const response = await fetch(
            `${BASE_URL}bookings`,
            {
                headers: { "Content-Type": "application/json" },
                method: "post",
                body: JSON.stringify(bookevent),
            }
        );
        if (!response.ok) {
            throw new Error(`Error booking an event: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};