import type { UserBookings } from "./../models/userBookings";
import { getUserId } from "./../models/userState";

export const fetchUserBookingsData = async (): Promise<UserBookings> => {
    console.log("userid from getMyBookings: ", getUserId());
    try {
        const response = await fetch(
            `http://localhost:8080/api/bookings/byUser/${getUserId()}`
        );
        if (response.status !== 200) {
            throw new Error("Something went wrong!");
        }
        const data: UserBookings = await response.json();
        console.log("Fetched data", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
