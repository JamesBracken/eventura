package com.eventura.springboot_mysql_eventura.services;
import com.eventura.springboot_mysql_eventura.models.Address;
import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.models.User;
import com.eventura.springboot_mysql_eventura.repository.EventRepository;
import com.eventura.springboot_mysql_eventura.repository.AddressRepository;
import com.eventura.springboot_mysql_eventura.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepo;
    private final UserRepository userRepo;
    private final AddressRepository addressRepo;


    public EventService(EventRepository eventRepo, UserRepository userRepo, AddressRepository addressRepo) {
        this.eventRepo = eventRepo;
        this.userRepo=userRepo;
        this.addressRepo = addressRepo;
    }

    // CREATE
    public Event createEvent(Event event) {
        if (!StringUtils.hasText(event.getEventName())) {
            throw new IllegalArgumentException("Event name is required");
        }
        // Checking if organiser exists by email

        if (event.getOrganiser() != null && StringUtils.hasText(event.getOrganiser().getEmail())) {
            User organiser = userRepo.findByEmail(event.getOrganiser().getEmail())
                    .orElseThrow(() -> new RuntimeException(
                            "Organiser with email " + event.getOrganiser().getEmail() + " not found"));
            event.setOrganiser(organiser);
        } else {
            throw new IllegalArgumentException("Organiser email is required");
        }

        if (event.getCreatedBy() != null && StringUtils.hasText(event.getCreatedBy().getEmail())) {
            User creator = userRepo.findByEmail(event.getCreatedBy().getEmail())
                    .orElseThrow(() -> new RuntimeException(
                            "CreatedBy user with email " + event.getCreatedBy().getEmail() + " not found"));
            event.setCreatedBy(creator);
        } else {
            throw new IllegalArgumentException("CreatedBy email is required");
        }

        // Checking if address exists
        if (event.getAddress() != null && event.getAddress().getId() != null) {
            Address address = addressRepo.findById(event.getAddress().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Address with ID " + event.getAddress().getId() + " not found"));
            event.setAddress(address);
        } else {
            throw new IllegalArgumentException("Address ID is required");
        }

        if (event.getCreatedDate() == null) {
            event.setCreatedDate(LocalDateTime.now());
        }
        return eventRepo.save(event);
    }

    // READ
    public Event getEventById(Long id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Event with ID %d not found", id)));
    }

    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    // UPDATE
    public Event updateEvent(Long id, Event updatedEvent) {
        Event existing = getEventById(id);

        if (StringUtils.hasText(updatedEvent.getEventName())) {
            existing.setEventName(updatedEvent.getEventName());
        }
        if (StringUtils.hasText(updatedEvent.getEventDescription())) {
            existing.setEventDescription(updatedEvent.getEventDescription());
        }


        if (updatedEvent.getOrganiser() != null && StringUtils.hasText(updatedEvent.getOrganiser().getEmail())) {
            User organiser = userRepo.findByEmail(updatedEvent.getOrganiser().getEmail())
                    .orElseThrow(() -> new RuntimeException(
                            "Organiser with email " + updatedEvent.getOrganiser().getEmail() + " not found"));
            existing.setOrganiser(organiser);
        }


        if (updatedEvent.getCreatedBy() != null && StringUtils.hasText(updatedEvent.getCreatedBy().getEmail())) {
            User creator = userRepo.findByEmail(updatedEvent.getCreatedBy().getEmail())
                    .orElseThrow(() -> new RuntimeException(
                            "CreatedBy user with email " + updatedEvent.getCreatedBy().getEmail() + " not found"));
            existing.setCreatedBy(creator);
        }


        if (updatedEvent.getAddress() != null && updatedEvent.getAddress().getId() != null) {
            Address address = addressRepo.findById(updatedEvent.getAddress().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Address with ID " + updatedEvent.getAddress().getId() + " not found"));
            existing.setAddress(address);
        }

        if (updatedEvent.getMaxCapacity() != null) {
            existing.setMaxCapacity(updatedEvent.getMaxCapacity());
        }
        if (updatedEvent.getCostPerPerson() != null) {
            existing.setCostPerPerson(updatedEvent.getCostPerPerson());
        }

        existing.setUpdatedDate(LocalDateTime.now());

        return eventRepo.save(existing);
    }
    // DELETE
    public void deleteEvent(Long id) {
        if (!eventRepo.existsById(id)) {
            throw new EntityNotFoundException(
                    String.format("Event with ID %d not found", id)
            );
        }
        eventRepo.deleteById(id);
    }
}