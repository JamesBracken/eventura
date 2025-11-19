import { API_URL } from "../constants";

const BASE_URL = `${API_URL}api/`;
export const cancelABooking = async (bookingId: number) => {
    try {
        console.log("booking number:", bookingId)
        const response = await fetch(
            `${BASE_URL}bookings/${bookingId}`,
            {
                headers: { "Content-Type": "application/json" },
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(`Error cancelling a booking : ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
