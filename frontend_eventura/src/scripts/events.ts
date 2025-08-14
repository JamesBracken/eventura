import "./../styles/main.scss";

import type { EventCreateRequest, Event } from "./models/event";
import {
    createNewEvent,
    getAllEvents,
    deleteEventById,
    getEventById,
    updateEventById,
} from "./services/eventsService";

// DOM manipulation 

const form = document.querySelector("form") as HTMLFormElement;
const msg = document.querySelector<HTMLDivElement>("#formMessage")!;
const list = document.querySelector<HTMLDivElement>("#eventsList")!;

// Inputs 
const $ = (id:string) => document.getElementById(id)as HTMLInputElement | HTMLTextAreaElement;
const eventName = $("eventName") as HTMLInputElement;
const eventDescription = $("eventDescription") as HTMLTextAreaElement;
const organiserEmail = $("organiserEmail") as HTMLInputElement;
const createdByEmail = $("createdByEmail") as HTMLInputElement;
const addressId = $("addressId") as HTMLInputElement;
const noOfEventDates = $("noOfEventDates") as HTMLInputElement;
const maxCapacity = $("maxCapacity") as HTMLInputElement;
const costPerPerson = $("costPerPerson") as HTMLInputElement;
const startDate = $("startDate") as HTMLInputElement;
const endDate = $("endDate") as HTMLInputElement;

let editingId: number | null = null;

// Handle form submit and create an event
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const payload: EventCreateRequest = {
        eventName: eventName.value.trim(),
        eventDescription: eventDescription.value.trim() || undefined,
        organiser: { email: organiserEmail.value.trim() },
        createdBy: { email: createdByEmail.value.trim() },
        address: { id: Number(addressId.value.trim()) },
        noOfEventDates: noOfEventDates.value
            ? Number(noOfEventDates.value)
            : undefined,
        maxCapacity: maxCapacity.value ? Number(maxCapacity.value) : undefined,
        costPerPerson: costPerPerson.value
            ? Number(costPerPerson.value)
            : undefined,
        startDate: startDate.value,
        endDate: endDate.value,
    };

    // Basic validation

    if (
        !payload.eventName ||
        !payload.organiser.email ||
        !payload.createdBy.email ||
        !payload.address.id ||
        !payload.startDate ||
        !payload.endDate
    ) {
        msg.textContent = "Please fill all required fields.";
        msg.className = "text-danger";
        return;
    }

    try {
        if(editingId === null){
        const created: Event = await createNewEvent(payload);
        console.log("Event created:", created);
        msg.textContent = "Event created successfully.";}
        else {

        await updateEventById(editingId, payload);
        console.log("Event updated:", editingId);
        msg.textContent = "Event updated successfully.";
        editingId = null;
        (form.querySelector(`button[type="submit"]`) as HTMLButtonElement).textContent = "Create Event";
        
        }

        msg.className = "text-success";
        form.reset();
        await refreshList();
    } catch (e: any) {
        msg.textContent =
            e.message || "Something went wrong. Please try again.";
        msg.className = "text-danger";
    }
});

form.addEventListener("reset", () => {
    editingId = null;
    msg.textContent = "";
    msg.className = "";
    (
        form.querySelector('button[type="submit"]') as HTMLButtonElement
    ).textContent = "Create Event";
});

async function refreshList() {
    list.innerHTML = `<div class="text-muted">Loading…</div>`;
    try {
        const events = await getAllEvents();
        if (!events.length) {
            list.innerHTML = `<div class="text-muted">No events yet.</div>`;
            return;
        }
        list.innerHTML = events
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .map((ev) => {
                const when = `${(ev.startDate || "").replace("T", " ")} → ${(
                    ev.endDate || ""
                ).replace("T", " ")}`;
                return `
          <div class="card">
            <div class="card-body d-grid gap-2">
              <h3 class="h6 m-0">${ev.eventName}</h3>
              ${
                  ev.eventDescription
                      ? `<p class="mb-1">${ev.eventDescription}</p>`
                      : ""
              }
              <div class="small text-muted">${when}</div>
              <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-primary" data-edit="${
                  ev.id
              }">Edit</button>
              <button class="btn btn-sm btn-outline-danger" data-del="${
                  ev.id
              }">Delete</button>
            </div>
          </div>
        </div>
        `;
            })
            .join("");
    } catch (e: any) {
        list.innerHTML = `<div class="text-danger">Failed to load events: ${e.message}</div>`;
    }
}

// Click events for editing & deletion
list.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.edit) {
        editingId = Number(target.dataset.edit);
        const event = await getEventById(editingId);
        
            eventName.value = event.eventName;
            eventDescription.value = event.eventDescription || "";
            organiserEmail.value = event.organiser.email;
            createdByEmail.value = event.createdBy.email;
            addressId.value = String(event.address.id);
            noOfEventDates.value = String(event.noOfEventDates || "");
            maxCapacity.value = String(event.maxCapacity || "");
            costPerPerson.value = String(event.costPerPerson || "");
            startDate.value = event.startDate.slice(0,16);
            endDate.value = event.endDate.slice(0,16);

            (form.querySelector(`button[type="submit"]`) as HTMLButtonElement).textContent = "Update Event";
        }
    

    if (target.dataset.del) {
        const confirmed = confirm("Are you sure you want to delete this event?");
        if (confirmed) {
            await deleteEventById(Number(target.dataset.del));
            await refreshList();
        }
    }
});

refreshList();