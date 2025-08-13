export interface EventCreateRequest {
    eventName: string;
    eventDescription?: string;
    organiser: { email: string };
    createdBy: { email: string };
    address: { id: number };
    noOfEventDates?: number;
    maxCapacity?: number;
    costPerPerson?: number;
    startDate: string; // "yyyy-MM-ddTHH:mm:ss"
    endDate: string; // "yyyy-MM-ddTHH:mm:ss"
}

export interface Event extends EventCreateRequest {
    id: number;
    createdDate: string;
    updatedDate?: string;
}