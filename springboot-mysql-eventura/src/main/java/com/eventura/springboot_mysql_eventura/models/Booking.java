package com.eventura.springboot_mysql_eventura.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity(name="Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private short NoOfEventTickets; // CHANGE NAMING
    private Double TotalCost;   // CHANGE NAMING
    private boolean isCancel;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="event_id")
    private Event event;

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public short getNoOfEventTickets() {
        return NoOfEventTickets;
    }

    public void setNoOfEventTickets(short noOfEventTickets) {
        NoOfEventTickets = noOfEventTickets;
    }

    public Double getTotalCost() {
        return TotalCost;
    }

    public void setTotalCost(Double totalCost) {
        TotalCost = totalCost;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isCancel() {
        return isCancel;
    }

    public void setCancel(boolean cancel) {
        isCancel = cancel;
    }
}
