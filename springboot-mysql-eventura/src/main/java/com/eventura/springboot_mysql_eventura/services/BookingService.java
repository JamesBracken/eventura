package com.eventura.springboot_mysql_eventura.services;


import com.eventura.springboot_mysql_eventura.models.Booking;
import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.models.User;
import com.eventura.springboot_mysql_eventura.repository.BookingRepository;
import com.eventura.springboot_mysql_eventura.repository.EventRepository;
import com.eventura.springboot_mysql_eventura.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
public class BookingService {
    private final BookingRepository bookingRepo;
    private final UserRepository userRepo;
    private final EventRepository eventRepo;

    public BookingService(BookingRepository bookingRepo, UserRepository userRepo, EventRepository eventRepo) {
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this.eventRepo = eventRepo;
    }

    //Create
    public Booking createBooking(Booking booking) {

        Event event = eventRepo.findById(booking.getEvent().getId())
                .orElseThrow(() -> new RuntimeException("Event with id " + booking.getEvent().getId() + " does not exist"));

        User user = userRepo.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User with id " + booking.getUser().getId() + " does not exist"));

        booking.setEvent(event);
        booking.setUser(user);

        short ticketQty = booking.getNoOfEventTickets();
        if (booking.getNoOfEventTickets() < 1) {
            throw new IllegalArgumentException("Number of tickets must be 1 or more, not " + ticketQty);
        } else {
            booking.setNoOfEventTickets(ticketQty);
        }

        if(event.getCostPerPerson() != null) {
            double totalCost = booking.getNoOfEventTickets() * event.getCostPerPerson(); // ADD VALIDATION
            booking.setTotalCost(totalCost); //TotalCost = NoOfEventTickets * 10.0;// Need to access the event cost_per_person from event
        } else {
            throw new RuntimeException("The event cost per person must be 0+ not " + event.getCostPerPerson());
        }
