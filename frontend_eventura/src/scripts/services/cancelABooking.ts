export const cancelABooking = async (bookingId: number) => {
    console.log("in cancelABooking", bookingId);
    try {
        const response = await fetch(
            `https://eventura-production.up.railway.app/api/bookings/${bookingId}`,
            {
                headers: { "Content-Type": "application/json" },
                method: "DELETE"
            }
        );
        if (!response.ok) {
            throw new Error(`Error cancelling a booking : ${response.status}`);
        }
        const data = await response.json();
        console.log("Booking cancelled", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};