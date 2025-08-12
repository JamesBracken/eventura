package com.eventura.springboot_mysql_eventura.services;

import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.repository.EventRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepo;

    public EventService(EventRepository eventRepo){
        this.eventRepo = eventRepo;

    }
    // CREATE

    public Event createEvent(Event event){
        if(!StringUtils.hasText(event.getEventName())){
            throw new IllegalArgumentException("Event name is required");
        }
        event.setCreateDate(LocalDateTime.now());
        return eventRepo.save(event);
    }

    // READ

    public Event getEventById (Long id){
        return eventRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Event with ID %d not found", id)));
    }

    public List<Event>getAllEvents(){
        return eventRepo.findAll();
    }

    //UPDATE

    public Event updateEvent(Long id, Event updatedEvent){
        Event existing = getEventById(id);

        if (!StringUtils.hasText(updatedEvent.getEventName())){
            existing.setEventName(updatedEvent.getEventName());
        }
        if (updatedEvent.getStartDate()!=null){
            existing.setStartDate(updatedEvent.getStartDate());
        }
        if(updatedEvent.getEndDate() !=null){
            existing.setEndDate(updatedEvent.getEndDate());
        }
        if (StringUtils.hasText(updatedEvent.getHostContact())){
            existing.setHostContact(updatedEvent.getHostContact());
        }
        if(StringUtils.hasText(updatedEvent.getHostEmail())){
            existing.setHostEmail(updatedEvent.getHostEmail());
        }
        if (StringUtils.hasText(updatedEvent.getContactPerson())){
            existing.setContactPerson(updatedEvent.getContactPerson());
        }
        existing.setUpdatedDate(LocalDateTime.now());
        return eventRepo.save(existing);

    }

    // DELETE

    public void deleteEvent(Long id){
        if (!eventRepo.existsById(id)){
            throw new EntityNotFoundException(
                    String.format("Event with ID %d not found", id)
            );
        }
        eventRepo.deleteById(id);

    }



}