import type { BookEvents } from "../models/bookEvent";

const URL = "http://localhost:8080/api/";

export const bookAnEvent = async (bookevent: BookEvents) => {
    try {
        const response = await fetch(
            `${URL}bookings`,
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
        console.log("Event booked",data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};