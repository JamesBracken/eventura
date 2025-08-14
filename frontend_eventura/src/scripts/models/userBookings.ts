export interface UserBookings {
    bookingId: number,
    noOfEventTickets: number;
    totalCost: number;
    eventId: number;
    eventName: string;
    eventDescription: string;
    address: {
        id: number;
        addressLine1: string;
        addressLine2: string;
        postcode: string;
        city: string;
        country: string;
    };
}
