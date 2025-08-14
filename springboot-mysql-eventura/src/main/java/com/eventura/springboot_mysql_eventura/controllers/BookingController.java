package com.eventura.springboot_mysql_eventura.controllers;

import com.eventura.springboot_mysql_eventura.DTOs.BookingResponse;
import com.eventura.springboot_mysql_eventura.models.Booking;
import com.eventura.springboot_mysql_eventura.services.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/byUser/{id}")
    public List<BookingResponse> getBookingsForUser(@PathVariable Long id) {return bookingService.getBookingsForUser(id);
    }

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return String.format("Booking with ID %d has been deleted", id );
    }
}
