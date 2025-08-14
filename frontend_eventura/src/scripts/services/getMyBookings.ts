import type { MyBookings } from "../models/myBookings";
// import { userId } from "../models/userState";

export const fetchData = async (): Promise<MyBookings> => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/bookings/mybookings/1`
        );
        if (response.status !== 200) {
            throw new Error("Something went wrong!");
        }
        const data: MyBookings = await response.json();
        console.log("Fetched data", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
