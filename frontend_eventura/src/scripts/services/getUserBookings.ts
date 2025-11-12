import type { UserBookings } from "./../models/userBookings";
import { getUserId } from "./../models/userState";

export const fetchUserBookingsData = async (): Promise<UserBookings> => {
    const URL = "http://localhost:8080/api/";
    try {
        const response = await fetch(
            `${URL}bookings/byUser/${getUserId()}`
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
