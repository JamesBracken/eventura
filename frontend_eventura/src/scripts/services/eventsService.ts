import type { EventCreateRequest, Event } from "../models/event";

const BASE_URL = "http://localhost:8080/api/events";

export const createNewEvent = async (payload: EventCreateRequest): Promise<Event> => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Error creating event: ${res.status}`);
        const data: Event = await res.json();
        console.log("Event created", data);
        return data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};
