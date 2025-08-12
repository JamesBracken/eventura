package com.eventura.springboot_mysql_eventura.controllers;

import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.services.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventSerivce;

    public EventController(EventService eventService){
        this.eventSerivce = eventService;
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event){
        return eventSerivce.createEvent(event);
    }

    @GetMapping
    public List<Event>getAllEvents(){
        return eventSerivce.getAllEvents();
    }

    @GetMapping("/{id}")
    public Event getEventBuId(@PathVariable Long id){
        return eventSerivce.getEventById(id);
    }

    @PutMapping("/{id")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event){
        return eventSerivce.updateEvent(id, event);
    }

    @DeleteMapping("/{id")
    public String deleteEvent(@PathVariable Long id){
        eventSerivce.deleteEvent(id);
        return String.format("Event with ID: %d has been deleted", id);
    }

}
