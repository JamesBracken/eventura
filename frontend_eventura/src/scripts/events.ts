import "./../styles/main.scss";

import type { EventCreateRequest, Event } from "./models/event";
import type { NewAddress } from "./models/newAddress";
import type { Address } from "./models/address";

import {
    createNewEvent,
    getAllEvents,
    deleteEventById,
    getEventById,
    updateEventById,
} from "./services/eventsService";

import { createNewAddress } from "./services/createNewAddress";

// DOM manipulation
const form = document.querySelector("form") as HTMLFormElement;
const msg = document.querySelector<HTMLDivElement>("#formMessage")!;
const list = document.querySelector<HTMLDivElement>("#eventsList")!;

// Inputs
const $ = (id: string) =>
    document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement;
const eventName = $("eventName") as HTMLInputElement;
const eventDescription = $("eventDescription") as HTMLTextAreaElement;
const organiserEmail = $("organiserEmail") as HTMLInputElement;
const createdByEmail = $("createdByEmail") as HTMLInputElement; // ← restored
const locationInput = $("location") as HTMLInputElement;
const noOfEventDates = $("noOfEventDates") as HTMLInputElement;
const maxCapacity = $("maxCapacity") as HTMLInputElement;
const costPerPerson = $("costPerPerson") as HTMLInputElement;
const startDate = $("startDate") as HTMLInputElement;
const endDate = $("endDate") as HTMLInputElement;

const addr1 = $("addressline1") as HTMLInputElement;
const addr2 = $("addressline2") as HTMLInputElement;
const city = $("city") as HTMLInputElement;
const postcode = $("postcode") as HTMLInputElement;
const country = $("country") as HTMLInputElement;

let editingId: number | null = null;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    try {
        let createdAddress: Address | undefined;

        if (
            addr1?.value.trim() ||
            addr2?.value.trim() ||
            city?.value.trim() ||
            postcode?.value.trim() ||
            country?.value.trim()
        ) {
            const newAddressData: NewAddress = {
                addressLine1: addr1.value.trim(),
                addressLine2: addr2.value.trim(),
                postcode: postcode.value.trim(),
                city: city.value.trim(),
                country: country.value.trim(),
            };
            createdAddress = await createNewAddress(newAddressData);
            console.log("New Address saved:", createdAddress);
        }

        .
        const payload: EventCreateRequest = {
            eventName: eventName.value.trim(),
            eventDescription: eventDescription.value.trim() || undefined,
            organiser: { email: organiserEmail.value.trim() },
            createdBy: { email: organiserEmail.value.trim() }, 
            address: createdAddress ? { id: createdAddress.id } : undefined,
            location: locationInput.value.trim() || undefined,
            noOfEventDates: noOfEventDates.value
                ? Number(noOfEventDates.value)
                : undefined,
            maxCapacity: maxCapacity.value
                ? Number(maxCapacity.value)
                : undefined,
            costPerPerson: costPerPerson.value
                ? Number(costPerPerson.value)
                : undefined,
            startDate: startDate.value,
            endDate: endDate.value,
        };

 
        if (
            !payload.eventName ||
            !payload.organiser.email ||
            !payload.startDate ||
            !payload.endDate
        ) {
            msg.textContent = "Please fill all required fields.";
            msg.className = "text-danger";
            return;
        }

        if (editingId === null) {
            const created: Event = await createNewEvent(payload);
            console.log("Event created:", created);
            msg.textContent = "Event created successfully.";
        } else {
            await updateEventById(editingId, payload);
            console.log("Event updated:", editingId);
            msg.textContent = "Event updated successfully.";
            editingId = null;
            (
                form.querySelector(`button[type="submit"]`) as HTMLButtonElement
            ).textContent = "Create Event";
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
        createdByEmail.value = event.createdBy.email; // ← restored
        locationInput.value = event.location || "";
        noOfEventDates.value = String(event.noOfEventDates || "");
        maxCapacity.value = String(event.maxCapacity || "");
        costPerPerson.value = String(event.costPerPerson || "");
        startDate.value = event.startDate.slice(0, 16);
        endDate.value = event.endDate.slice(0, 16);

        (
            form.querySelector(`button[type="submit"]`) as HTMLButtonElement
        ).textContent = "Update Event";
    }

    if (target.dataset.del) {
        const confirmed = confirm(
            "Are you sure you want to delete this event?"
        );
        if (confirmed) {
            await deleteEventById(Number(target.dataset.del));
            await refreshList();
        }
    }
});

refreshList();
