import type { UserBookings } from "./../models/userBookings";
import { getUserId } from "./../models/userState";
import {API_URL} from "../constants";

export const fetchUserBookingsData = async (): Promise<UserBookings> => {
    const BASE_URL = `${API_URL}api/`;
    try {
        const response = await fetch(
            `${BASE_URL}bookings/byUser/${getUserId()}`
        );
        if (response.status !== 200) {
            throw new Error("Something went wrong!");
        }
        const data: UserBookings = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
