import type { EventCreateRequest, Event } from "../models/event";
import {API_URL} from "../constants";

const BASE_URL = `${API_URL}api/events`;

// Creating a new event
export const createNewEvent = async (
    payload: EventCreateRequest
): Promise<Event> => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Error creating event: ${res.status}`);
        const data: Event = await res.json();
        return data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};
// // READ – all
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error(`Error fetching events: ${res.status}`);
        const data: Event[] = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Read by id
export const getEventById = async (id: number): Promise<Event> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error(`Error fetching event: ${res.status}`);
        const data: Event = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};

// Update an event -by id
export const updateEventById = async (
    id: number,
    payload: Partial<Event>
): Promise<Event> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Error updating event: ${res.status}`);
        const data: Event = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

// delete - by id
export const deleteEventById = async (id: number): Promise<void> => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(`Error deleting event: ${res.status}`);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};
