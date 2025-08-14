import "./../styles/main.scss";

const eventsData = [
    {
        name: "Party in Park Festival",
        date: "2025/08/24",
        location: "London",
    },
    {
        name: "Van Goegh showing ",
        date: "2025/09/10",
        location: "London",
    },
    {
        name: "Oasis Concert",
        date: "2026/10/10",
        location: "London",
    },
];

const bookedData = [
    {
        name: "Music Festival",
        date: "2025/08/21",
        location: "London",
    },
    {
        name: "Tech Conference",
        date: "2025/09/10",
        location: "Birmingham",
    },
    {
        name: "Tech Conference",
        date: "2025/10/10",
        location: "London",
    },
];

document.addEventListener("DOMContentLoaded",()=>{

const booked = document.querySelector(".booked__grid") as HTMLElement;

booked.innerHTML = bookedData
    .map(
        (event) => `
  <article class="event-card">
    <h3 class="event-card__name">${event.name}</h3>
    <p class="event-card__date">${event.date}</p>
    <p class="event-card__location">${event.location}</p>
  </article>
`
    )
    .join("");

const futureEvents = document.querySelector(".events__grid") as HTMLElement;

futureEvents.innerHTML = eventsData
    .map(
        (event) => `
  <article class="event-card">
    <h3 class="event-card__name">${event.name}</h3>
    <p class="event-card__date">${event.date}</p>
    <p class="event-card__location">${event.location}</p>
  </article>
`
    )
    .join("");
});
