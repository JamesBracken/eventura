import "./../styles/main.scss";
import { fetchUserBookingsData } from "./services/getUserBookings";
import { bookAnEvent } from "./services/bookAnEvent";
import type { BookEvents } from "./models/bookEvent";
import { getUserId,getIsAdminUser } from "./models/userState";
import { getAllEvents } from "./services/eventsService";
let eventsData: any[] = [];

document.addEventListener("DOMContentLoaded", async () => {
    const errorMessageEl =
        document.querySelector<HTMLDivElement>("#error-message");
    const futureEvents = document.querySelector(".events__grid") as HTMLElement;
    const bookedGrid = document.querySelector<HTMLElement>(".booked__grid");

    console.log("insidebookings: ",getIsAdminUser())
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
            // eventsData = await getAllEvents();
            // if (errorMessageEl) {
            //     errorMessageEl.textContent = "loading data ...";
            // }

            if (futureEvents && Array.isArray(eventsData)) {
                futureEvents.innerHTML = eventsData
                    .map(
                        (event) => `
            <article class="event-card">
                <h3 class="event-card__name">${event.eventName}</h3>
                <p class="event-card__date">${event.startDate}</p>
                <p class="event-card__location">${event.address}</p>
                <button class="book-btn" data-id="${event.id}">Book</button>
            </article>
        `
                    )
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

    const renderNyBookedEvents = async () => {
        try {
            const bookedData = await fetchUserBookingsData();

            if (errorMessageEl) {
                errorMessageEl.textContent = "loading data ...";
            }

            if (bookedGrid && Array.isArray(bookedData)) {
                bookedGrid.innerHTML = bookedData
                    .map(
                        (event) => `
                        <article class="event-card">
                            <h3 class="event-card__name">${event.eventName}</h3>
                            <p class="event-card__noTickets">Tickets: ${event.noOfEventTickets}</p>
                            <p class="event-card__location">Location:${event.address.postcode}</p>
                        </article>
                    `
                    )
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

    const addFutureEventsAlert = () => {
        // Attach a single click listener to parent container (event delegation)
        futureEvents.addEventListener("click", async (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("book-btn")) {
                const eventId = target.getAttribute("data-id");
                console.log(`event id to book to: ${eventId}`);
                console.log(`User id: ${getUserId()}`);

                const ticketsStr = window.prompt(
                    "Enter number of tickets:",
                    "1"
                );
                if (!ticketsStr) return; // user cancelled
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
                    console.log("Booked an event successfully:", result);
                    eventsData = eventsData.filter(
                        (event) => event.id !== Number(eventId)
                    );
                    renderNyBookedEvents();
                    renderFutureEvents();
                } catch (error) {
                    console.error("Booking failed:", error);
                }
            }
        });
    };

    await renderNyBookedEvents();
    // await renderFutureEvents();
    await getEvents();
    addFutureEventsAlert();
});
