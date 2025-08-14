import "../styles/main.scss";
import { getAllEvents } from "./services/eventsService";
let eventsData: any[] = [];

document.addEventListener("DOMContentLoaded", async () => {
    const errorMessageEl =
        document.querySelector<HTMLDivElement>("#error-message");
    const futureEvents = document.querySelector(".events__grid") as HTMLElement;

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
            <article class="event-card">
                <h3 class="event-card__name">${event.eventName}</h3>
                <p class="event-card__date">${formattedDate}</p>
                <p class="event-card__location">${event.address.postcode}</p>

            </article>
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
    await getEvents();
});
