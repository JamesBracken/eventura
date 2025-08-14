import type { BookEvents } from "../models/bookEvent";

export const bookAnEvent = async (bookevent: BookEvents) => {
    try {
        const response = await fetch(
            `https://eventura-production.up.railway.app/api/bookings`,
            {
                headers: { "Content-Type": "application/json" },
                method: "delete",
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