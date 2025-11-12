import "./../styles/main.scss";
import { fetchUserBookingsData } from "./services/getUserBookings";
import { bookAnEvent } from "./services/bookAnEvent";
import { cancelABooking } from "./services/cancelABooking"
import type { BookEvents } from "./models/bookEvent";
import { getUserId, getAdminUser } from "./models/userState";
import { getAllEvents } from "./services/eventsService";
let eventsData: any[] = [];
const today = new Date();

document.addEventListener("DOMContentLoaded", async () => {
    const errorMessageEl =
        document.querySelector<HTMLDivElement>("#error-message");
    const futureEvents = document.querySelector(".events__grid") as HTMLElement;
    const bookedGrid = document.querySelector<HTMLElement>(".booked__grid");

    const getEvents = async () => {
        try {
            eventsData = await getAllEvents(); // store once at startup
            renderFutureEvents();
        } catch (err) {
            console.error("Error fetching future events:", err);
            if (errorMessageEl) {
                errorMessageEl.textContent =
                    err instanceof Error
                        ? err.message
                        : "Something went wrong. Please try again.";
            }
        }
    };

    const renderFutureEvents = async () => {
        try {
            if (futureEvents && Array.isArray(eventsData)) {
                futureEvents.innerHTML = eventsData
                 .filter(event => new Date(event.startDate) >= today)
                    .map((event) => {
                        // Convert ISO date string to Date object
                        const date = new Date(event.startDate);
                        const options = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        } as Intl.DateTimeFormatOptions;

                        const formattedDate = date.toLocaleDateString(
                            undefined,
                            options
                        );

                        return `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
                        <article class="event-card h-100">
                            <h3 class="event-card__name">${event.eventName}</h3>
                            <p class="event-card__date">${formattedDate}</p>
                            <p class="event-card__location">${event.address.postcode}</p>
                            <button class="small-button" data-id="${event.id}">Book</button>
                        </article>
            </div>
                    `;
                    })
                    .join("");
            }
        } catch (err) {
            console.error("Error in login process:", err);
            if (errorMessageEl) {
                if (err instanceof Error) {
                    errorMessageEl.textContent = err.message;
                } else {
                    errorMessageEl.textContent =
                        "Something went wrong. Please try again.";
                }
            }
        }
    };

    const renderMyBookedEvents = async () => {
        try {
            const bookedData = await fetchUserBookingsData();

            if (errorMessageEl) {
                errorMessageEl.textContent = "loading data ...";
            }

            if (bookedGrid && Array.isArray(bookedData)) {
                bookedGrid.innerHTML = bookedData
                    .map(
                        (event) => `
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
                        <article class="event-card h-100">
                            <h3 class="event-card__name">${event.eventName}</h3>
                            <p class="event-card__noTickets">Tickets: ${event.noOfEventTickets}</p>
                            <p class="event-card__location">Location:${event.address.postcode}</p>
                            <button class="cancel-button" data-id="${event.bookingId}">Cancel</button>
                        </article>
                        </div>
                    `
                    )
                    .join("");
            }
        } catch (err) {
            console.error("Error in future events process:", err);
            if (errorMessageEl) {
                if (err instanceof Error) {
                    errorMessageEl.textContent = err.message;
                } else {
                    errorMessageEl.textContent =
                        "Something went wrong. Please try again.";
                }
            }
        }
    };

    const addFutureEventsAlert = () => {
        // Attach a single click listener to parent container (event delegation)
        futureEvents.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("small-button")) {
                const eventId = target.getAttribute("data-id");

                const ticketsStr = window.prompt(
                    "Enter number of tickets:",
                    "1"
                );
                if (!ticketsStr) return; // user cancelled - don't want to book
                const noOfTickets = Number(ticketsStr);
                if (isNaN(noOfTickets) || noOfTickets <= 0) {
                    alert("Please enter a valid number of tickets.");
                    return;
                }
                const bookEventData: BookEvents = {
                    user: { id: Number(getUserId()) },
                    event: { id: Number(eventId) },
                    noOfEventTickets: noOfTickets,
                };

                try {
                    const result = await bookAnEvent(bookEventData);
                    eventsData = eventsData.filter(
                        (event) => event.id !== Number(eventId)
                    );
                    renderMyBookedEvents();
                    renderFutureEvents();
                } catch (error) {
                    console.error("Booking failed:", error);
                }
            }
        });
    };

    const cancelBookingAlert = () => {
        // Attach a single click listener to parent container (event delegation)
        bookedGrid?.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("cancel-button")) {
                const bookingId = target.getAttribute("data-id");

                try {
                    const result = await cancelABooking(Number(bookingId));
                    eventsData = eventsData.filter(
                        (event) => event.bookingId !== Number(bookingId)
                    );
                    renderMyBookedEvents();
                    renderFutureEvents();
                } catch (error) {
                    console.error("Booking cancellation failed:", error);
                }
            }
        });
    };

    await renderMyBookedEvents();
    await getEvents();
    addFutureEventsAlert();
    cancelBookingAlert();
});
