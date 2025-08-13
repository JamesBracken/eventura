import "./../styles/main.scss";

import type { EventCreateRequest, Event } from "../models/event";
// import {
//     createNewEvent,
//     getAllEvents,
//     deleteEventById,
// } from "../services/eventsService";

// DOM manipulation 

const form = document.querySelector("form") as HTMLFormElement;
const msg = document.querySelector<HTMLDivElement>("#formMessage");
const list = document.querySelector<HTMLDivElement>("#eventsList");

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

// fHandle form submit and create an event 
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const payload: EventCreateRequest = {
        eventName: eventName.value.trim(),
        eventDescription: eventDescription.value.trim() || undefined,
        organiser: {email: organiserEmail.value.trim()},
        createdBy: {email: createdByEmail.value.trim()},
        address: {id: Number(addressId.value.trim())},
        noOfEventDates: noOfEventDates.value ? Number(noOfEventDates.value) : undefined,
        maxCapacity: maxCapacity.value ? Number(maxCapacity.value): undefined


    }
});