package com.eventura.springboot_mysql_eventura.services;


import com.eventura.springboot_mysql_eventura.models.Booking;
import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.models.User;
import com.eventura.springboot_mysql_eventura.repository.BookingRepository;
import com.eventura.springboot_mysql_eventura.repository.EventRepository;
import com.eventura.springboot_mysql_eventura.repository.UserRepository;
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

        short ticketQty = booking.getNoOfEventTickets(); // ADD VALIDATION
        booking.setNoOfEventTickets(ticketQty);

        double totalCost = booking.getNoOfEventTickets() * event.getCostPerPerson(); // ADD VALIDATION
        booking.setTotalCost(totalCost); //TotalCost = NoOfEventTickets * 10.0;// Need to access the event cost_per_person from event

        //boolean isCancelled = booking.isCancel(); // ADD VALIDATION
        booking.setCancel(false);

        //UserId FINISHED
        //EventId FINISHED
        //NoOfEventTickets FINISHED
        //TotalCost FINISHED
        //isCancel FINISHED
        return bookingRepo.save(booking);
    }

    //Read

    // May want to add get bookings by user

    // May want to add get bookings by event

    //Update

    //Update NoOfEventTickets

    //Update TotalCost

    //Update IsEventCancel DO NOT DO

    //Delete

    //Delete Booking

}
